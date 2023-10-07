import React from 'react';
import './App.css';
import SvgPath from './components/svg.component';

function App() {
  return (
    <div className="App">
      <h1>OTIS</h1>
      <SvgPath fileName="chat" color="red" size={100} />
    </div>
  );
}

export default App;
