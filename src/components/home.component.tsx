import React from 'react';
import { HomeInterface } from '../models/models';

const HomeComponent = ({ logo, title, background, message }: HomeInterface) => {
  return (
    <div style={{ background }}>
      <img src={logo} alt="Logo" />
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};

export default HomeComponent;
