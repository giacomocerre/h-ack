import React from 'react';
import './App.css';
import SvgPath from './components/svg.component';
import { TwinApiProvider } from './containers/providers/TwinApiProvider';
import env from 'react-dotenv'

const {MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD} = env

function App() {
  return (
    <TwinApiProvider memoriID={MEMORY_TWIN_ID} password={MEMORY_TWIN_PASSWORD}>
      <div className="App">
        <h1>OTIS</h1>
        <SvgPath fileName="chat" color="red" size={100} />
      </div>
    </TwinApiProvider>
  );
}

export default App;
