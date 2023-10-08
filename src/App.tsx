import './App.css';
// import './styles/global.scss'
import env from 'react-dotenv'
import { ThemeContext } from './containers/providers/ThemeProvider';
import { useContext } from 'react';
import HomeComponent from './components/home.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatComponent from './components/chat.component';
import logo from "./assets/img/logo.png"
import SuggestList from './components/suggest.component';



const { MEMORY_TWIN_ID, MEMORY_TWIN_PASSWORD } = env

function App() {

  const data = {
    logo: logo,
    title: 'Intimate',
    message: 'Ciao, sono Otis e sono qua per ripondere ai tuoi dubbi risuardo la tua intimità.'
  };
  const suggestWidgetsMock = [
    {
      title: 'Potrei soffrire di micorpenia?',
      description: 'Quando sei pronto, ne riparliamo.',
      image: '../assets/img/masturb.jpg', // Just a placeholder image URL (replace with your actual URLs)
    },
    {
      title: 'Non riesco a capire cosa mi piace.',
      description: 'E\' un buon momento per chattare? Riprendiamo da dove avevamo interrotto.',
      image: '../assets/img/masturb.jpg',
    },
    {
      title: 'Perchè non provo piacere quando mi masturbo?',
      description: 'Quando sei pronto, completiamo insieme la tua valutazione.',
      image: '../assets/img/masturb.jpg',
    },
    {
      title: 'Come si infila un tampax?',
      description: 'Felice di averti aiutato :)',
      image: '../assets/img/masturb.jpg',
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent {...data} />} />
        <Route path="/chat" element={<ChatComponent />} />
        <Route path="/suggest" element={<SuggestList data={suggestWidgetsMock} />} />
      </Routes>
    </Router>
  );
}

export default App;
