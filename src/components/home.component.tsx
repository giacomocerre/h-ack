import React, { useState, useEffect } from 'react';
import { HomeInterface } from '../models/models';
import '../styles/global.scss';
import { Link } from 'react-router-dom';
import AgeVerificationComponent from './ageVerify.component';

const HomeComponent = ({ logo, title, message }: HomeInterface) => {
  const [typedMessage, setTypedMessage] = useState('');

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
    // Do something with the date, e.g., save it to state or send it to a server
  };

  return (
    <div className='home-content'>
      <div className='home-info-container'>
        <img src={logo} alt='Logo' />
        <h1 className=''>{title}</h1>
        <div className='message-print'>
          <p className='message-write'>{typedMessage}</p>
        </div>
        <div className='start-button button-chat'>
          <Link to="/chat"><p className='button-value button-dark'>Parliamone insieme</p></Link>
        </div>
      </div>
      {/* <AgeVerificationComponent onAgeVerified={handleAgeVerified}/> */}
    </div>
  );
};

export default HomeComponent;
