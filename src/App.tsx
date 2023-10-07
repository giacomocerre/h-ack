import './App.css';
// import './styles/global.scss'
import env from 'react-dotenv'
import { ThemeContext } from './containers/providers/ThemeProvider';
import { useContext } from 'react';
import HomeComponent from './components/home.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatComponent from './components/chat.component';
import logo from "./assets/img/logo.png"



const { MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD } = env

function App() {
  const contextValue = useContext(ThemeContext);
  console.log(contextValue)
  if (!contextValue) {
    // Handle the case where the context value is undefined
    return <div>Loading...</div>;
  }

  const { theme, toggleTheme } = contextValue;
  const data = {
    logo: logo,
    title: 'Intimate',
    background: '../assets/img/background.jpg',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus ex, mattis ut neque id, pellentesque suscipit mi. Nulla sollicitudin odio libero, vel cursus augue sodales quis.',
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent {...data} />} />
        <Route path="/chat" element={<ChatComponent />} />
      </Routes>
    </Router>
    // <div className={`App theme-${theme}`}>
    //   {/* <h1>OTIS</h1>
    //   <button  onClick={() => toggleTheme('dark')}>Dark Theme</button>
    //   <button  onClick={() => toggleTheme('light')}>Light Theme</button>
    //   <Logo fill='red' stroke='green' width={100} height={100} /> */}
    //   {/* <HomeComponent {...data}/> */}
    // </div>
  );
}

export default App;
