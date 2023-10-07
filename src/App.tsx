import './App.css';
import { TwinApiProvider } from './containers/providers/TwinApiProvider';
import env from 'react-dotenv'
import { ReactComponent as Logo } from './assets/icons/chat.svg';
import { ThemeContext } from './containers/providers/ThemeProvider';
import { useContext } from 'react';
import HomeComponent from './components/home.component';
import { MainChat } from './containers/MainChat';

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
    logo: 'path/to/logo.png',
    title: 'My App',
    background: '#eaeaea',
    message: 'Welcome to my app!',
  };
  return (
    <TwinApiProvider memoriID={MEMORY_TWIN_ID} password={MEMORY_TWIN_PASSWORD}>
      <div className={`App theme-${theme}`}>
        {/* <h1>OTIS</h1>
        <button  onClick={() => toggleTheme('dark')}>Dark Theme</button>
        <button  onClick={() => toggleTheme('light')}>Light Theme</button>
        <Logo fill='red' stroke='green' width={100} height={100} /> */}
        <HomeComponent {...data}/>
        <MainChat />
      </div>
    </TwinApiProvider>
  );
}

export default App;
