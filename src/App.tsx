import './App.css';
import { TwinApiProvider } from './containers/providers/TwinApiProvider';
import env from 'react-dotenv'
import { ReactComponent as Logo } from './assets/icons/chat.svg';

const {MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD} = env

function App() {
  return (
    <TwinApiProvider memoriID={MEMORY_TWIN_ID} password={MEMORY_TWIN_PASSWORD}>
      <div className="App">
        <h1>OTIS</h1>
        <Logo fill='red' stroke='green' width={100} height={100}/>
      </div>
    </TwinApiProvider>
  );
}

export default App;
