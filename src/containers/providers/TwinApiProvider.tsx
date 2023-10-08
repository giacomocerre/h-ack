import { createContext, useCallback, useContext, useState } from "react";
import memoriApiClient from "@memori.ai/memori-api-client";

const client = memoriApiClient();

export type TwinApiProviderProps = {
  children: React.ReactNode;
  memoriID: string;
  password: string;
};

export type TwinApiProviderContextType = {
  sessionId: string | undefined;
  messages: Array<Message>
  isTyping: boolean
  latestResponse: TextMessage | undefined
  sendMessage: (message: string) => Promise<void>
  startSession: (birthDate: string, newSession?: boolean) => Promise<void>
};

export const TwinApiProviderContext = createContext<TwinApiProviderContextType>(
  {
    sessionId: undefined,
    messages: [],
    isTyping: false,
    latestResponse: undefined,
    sendMessage: async () => {},
    startSession: async () => {},
  }
);

export type TextMessage = {
  timestamp: number
  type: 'text'
  content: {
  text: string}
}

export type Message = TextMessage // Add more type here

export const TwinApiProvider = ({ children, memoriID, password }: TwinApiProviderProps) => {
  const [sessionId, setSessionId] = useState<string>()
  const [latestResponse, setLatestResponse] = useState<TextMessage>()
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [messages, setMessages] = useState<Array<Message>>([])

  const startSession = useCallback(async (birthDate: string, newSession?: boolean) => {

    if (sessionId && newSession) {
      console.log('closing session', sessionId)
      if(newSession){
        setLatestResponse(undefined)
        setSessionId(undefined)
        await client.deleteSession(sessionId)
      }

      return
    }

    setIsTyping(true)

    const { sessionID, currentState, ...resp } = await client.initSession({
      memoriID,
      password,
      birthDate,
    })

    setIsTyping(false)

    if (sessionID && currentState && resp.resultCode === 0) {
      setSessionId(sessionID)

      console.log('fetched session', sessionID, currentState)
      if (currentState.emission) {
        const message: TextMessage = {
          timestamp: Date.now(),
          type: 'text',
          content: { text: currentState.emission! },
        }

        setMessages((messages) => [...messages, message])

        setLatestResponse(() => message )
      }
    }
  }, [sessionId, memoriID, password])

  const sendMessage = async (message: string) => {
    if (!sessionId) {
      console.error('No session ID')
      return
    }

    if (message.trim()) {
      setMessages((messages) => [...messages, {
        timestamp: Date.now(),
        type: 'text',
        content: { text: message },
      }])

      setIsTyping(true)

      const { currentState, ...resp } = await client.postTextEnteredEvent({
        sessionId,
        text: message
      })

      setIsTyping(false)

      if (currentState.emission && resp.resultCode === 0) {
        const message: TextMessage = {
          timestamp: Date.now(),
          type: 'text',
          content: { text: currentState.emission! },
        }

        setMessages((messages) => [...messages, message])

        setLatestResponse(() => message )
      }
    }
  }

  const contextValue: TwinApiProviderContextType = {
    sessionId,
    messages,
    isTyping,
    sendMessage,
    startSession,
    latestResponse
  };

  return (
    <TwinApiProviderContext.Provider value={contextValue}>
      {children}
    </TwinApiProviderContext.Provider>
  );
};

export const useTwinApiContext = (): TwinApiProviderContextType => {
  const context = useContext(TwinApiProviderContext);
  if (context === undefined) {
    throw new Error('useTwinApiContext should be used within TwinApiProvider');
  }
  return context;
};
