import { FunctionComponent, useEffect, useState } from "react";
import { useTwinApiContext } from "./providers/TwinApiProvider";
import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, MessageProps, useMessages } from "@chatui/core";
import '@chatui/core/dist/index.css';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/img/logo_black.png'
import otis from '../assets/img/otis.png'

export type MainChatProps = {
  newSession?: boolean
  birthDate: string
  sessionStarted: () => void
}

export const MainChat: FunctionComponent<MainChatProps> = ({birthDate, newSession, sessionStarted}) => {
  const { messages, appendMsg, setTyping, resetList } = useMessages([])
  const navigate = useNavigate()

  const { startSession, sendMessage, isTyping, latestResponse } = useTwinApiContext()

  useEffect(() => {
    setTyping(isTyping)
  }, [isTyping, setTyping])
  
  useEffect(() => {
    if(newSession){
      console.log("STARTING SESSION: RESET LIST")
      resetList()
      startSession(birthDate, newSession)
      sessionStarted()
    }
  }, [startSession, resetList, newSession, birthDate, sessionStarted])

  useEffect(() => {
    if (latestResponse) {
      console.log("APPENDING MESSAGE: BOT", latestResponse)
      appendMsg({
        type: 'text',
        content: {text: latestResponse.content.text },
        user: {avatar: otis},
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