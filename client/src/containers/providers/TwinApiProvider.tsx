import { createContext, useCallback, useContext, useEffect, useState } from "react";
import memoriApiClient from "@memori.ai/memori-api-client";

const client = memoriApiClient();

export type TwinApiProviderProps = {
  children: React.ReactNode;
  memoriID: string;
};

export type TwinApiProviderContextType = {
  sessionId: string | undefined;
  messages: Array<Message>
  sendMessage: (message: string) => Promise<void>
};

export const TwinApiProviderContext = createContext<TwinApiProviderContextType>(
  {
    sessionId: undefined,
    messages: [],
    sendMessage: async () => {},
  }
);

export type TextMessage = {
  timestamp: number
  type: 'text'
  content: {
  text: string}
}

export type Message = TextMessage // Add more type here

export const TwinApiProvider = ({ children, memoriID }: TwinApiProviderProps) => {
  const [sessionId, setSessionId] = useState<string>()
  const [messages, setMessages] = useState<Array<Message>>([])

  const fetchSession = useCallback(async () => {
    if (sessionId) return

    const { sessionID, currentState, ...resp } = await client.initSession({
      memoriID,
    })

    if (sessionID && currentState && resp.resultCode === 0) {
      setSessionId(sessionID)

      console.log('fetched session', sessionID, currentState)
      if (currentState.emission) {
        setMessages((messages) => [...messages, {
          timestamp: Date.now(),
          type: 'text',
          content: { text: currentState.emission! },
        }])
      }
    }
  }, [sessionId, memoriID])

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

      const { currentState, ...resp } = await client.postTextEnteredEvent({
        sessionId,
        text: message
      })

      if (currentState.emission && resp.resultCode === 0)
      setMessages((messages) => [...messages, {
        timestamp: Date.now(),
        type: 'text',
        content: { text: currentState.emission! },
      }])
    }
  }

  useEffect(() => {
    if (!sessionId) fetchSession()
  }, [sessionId, fetchSession])

  const contextValue: TwinApiProviderContextType = {
    sessionId,
    messages,
    sendMessage
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