import { FunctionComponent, useEffect } from "react";
import { useTwinApiContext } from "./providers/TwinApiProvider";
import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, MessageProps, useMessages } from "@chatui/core";
import '@chatui/core/dist/index.css';

export const MainChat: FunctionComponent = () => {
  const { messages, appendMsg, setTyping } = useMessages([])

  const {startSession, sendMessage, isTyping, latestResponse  } = useTwinApiContext()

  useEffect(() => {
    setTyping(isTyping)
  }, [isTyping, setTyping])
  
  useEffect(() => {
    startSession("1991-01-01")
  }, [startSession])

  useEffect(() => {
    if (latestResponse) {
      appendMsg({
        type: 'text',
        content: {text: latestResponse.content.text}
      })
    }
  }, [appendMsg, latestResponse])

  // useEffect(() => {
  //   twinMessages.forEach((msg) => {
  //     appendMsg({type: 'text', content: {text: msg}})
  //   })
  // })

  const handleSend = async (type: string, val: string) => {
    const message = val.trim()

    if (!message) return

    await sendMessage(val)
    appendMsg({type: 'text', content: {text: message}})
  }

  function renderMessageContent(msg: MessageProps) {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  return (<Chat
      locale="it-IT"
      navbar={{ title: 'Parla con Otis' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder="Chiedimi qualcosa..."
  />)
}