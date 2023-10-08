import { FunctionComponent, useEffect, useState } from "react";
import { useTwinApiContext } from "./providers/TwinApiProvider";
import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, MessageProps, useMessages } from "@chatui/core";
import '@chatui/core/dist/index.css';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/img/logo_black.png'

export const MainChat: FunctionComponent = () => {
  const { messages, appendMsg, setTyping } = useMessages([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()


  const {sessionId, startSession, sendMessage, isTyping, latestResponse  } = useTwinApiContext()

  useEffect(() => {
    setTyping(isTyping)
  }, [isTyping, setTyping])
  
  useEffect(() => {
    if(!sessionId && !isLoading){
      console.log("HERE")

      setIsLoading(true)
      startSession("1991-01-01").then(() => {
        setIsLoading(false)
      })
    }
  }, [startSession, sessionId, isLoading, setIsLoading])

  useEffect(() => {
    if (latestResponse) {
      appendMsg({
        type: 'text',
        content: {text: latestResponse.content.text },
        user: {avatar: 'https://www.treedom.net/images/small_297111'},
        createdAt: latestResponse.timestamp,
        hasTime: true,
        renderMessageContent(message) {
          return <Bubble content={message.content.text} className="botMessageBubble"  />
        },
      })
    }
  }, [appendMsg, latestResponse])

  const handleSend = async (type: string, val: string) => {
    const message = val.trim()

    if (!message) return

    await sendMessage(val)
    appendMsg({type: 'text', content: {text: message}, position: 'right'})
  }

  function renderMessageContent(msg: MessageProps) {
    const { content } = msg

    if(msg.renderMessageContent){
      return msg.renderMessageContent(msg)
    }

    return <Bubble content={content.text}  />
  }

  function onBackClick() {
    navigate('/')
  }

  return (<Chat
      locale="it-IT"
      navbar={
        { 
          title: 'Parla con Otis',
          logo,
          rightContent:[ {
            icon: "compass",
            onClick: () => navigate('/suggest')
          }],
          className: 'chatNavbar',
          leftContent: { 
            icon: "chevron-left",
            className:"returnBtn",
            onClick: onBackClick
          } 
        }
      }
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder="Chiedimi qualcosa..."
      
  />)
}