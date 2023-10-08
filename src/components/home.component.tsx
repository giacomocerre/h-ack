import React, { useState, useEffect } from 'react';
import { HomeInterface } from '../models/models';
import '../styles/global.scss';
import AgeVerificationComponent from './ageVerify.component';
import { useNavigate } from 'react-router-dom';

const HomeComponent = ({ logo, title, message, startNewSession }: HomeInterface) => {
  const [typedMessage, setTypedMessage] = useState('');
  const [isAgeOpen, setIsAgeOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typedMessage.length < message.length) {
        setTypedMessage(message.substring(0, typedMessage.length + 1));
      } else {
        clearInterval(intervalId);
      }
    }, 30);

    return () => {
      clearInterval(intervalId);
    };
  }, [typedMessage, message]);

  const handleAgeVerified = (date: string) => {
    console.log('Date of Birth:', date);
    startNewSession(date.slice(0, 10));
    setIsAgeOpen(false);
    navigate('/chat')
    // Do something with the date, e.g., save it to state or send it to a server
  };

  return (
    <div className='home-content'>
      <div className='home-info-container'>
        <img className='logo' src={logo} alt='Logo' />
        <div className='message-print'>
          <p className='message-write'>{typedMessage}</p>
        </div>
        <div className='start-button button-chat'>
          <p onClick={() => setIsAgeOpen(true)} className='button-value button-dark'>Parliamone insieme</p>
        </div>
      </div>
      {isAgeOpen && <AgeVerificationComponent onAgeVerified={handleAgeVerified}/>}
    </div>
  );
};

export default HomeComponent;
