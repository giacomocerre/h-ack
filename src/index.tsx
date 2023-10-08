import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './containers/providers/ThemeProvider';
import { TwinApiProvider } from './containers/providers/TwinApiProvider';
import env from 'react-dotenv'

const { MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD } = env

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <TwinApiProvider memoriID={MEMORY_TWIN_ID} password={MEMORY_TWIN_PASSWORD}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TwinApiProvider>
);

reportWebVitals();