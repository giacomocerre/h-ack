// Import necessary modules
import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../assets/icons/home.png'
import Chat from '../assets/icons/chat.png'
import Suggest from '../assets/icons/suggest.png'



// Define the BottomMenu component
const Navigation = () => {
  return (
    <div className='navigator-content'>
      <div className="nav-item">
        <Link to="/" style={styles.icon}>
          <img src={Home} style={{width:"40px"}}/>
        </Link>
      </div>
      <div className="nav-item nav-big">
        <Link to="/chat" style={styles.icon}>
        <img src={Chat} style={{width:"80px"}}/>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/" style={styles.icon}>
        <img src={Suggest} style={{width:"40px"}}/>
        </Link>
      </div>
    </div>
  );
};

// Define the styles for the component
const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
  },
  icon: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
  },
};

// Export the BottomMenu component
export default Navigation;
