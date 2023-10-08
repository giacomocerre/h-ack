// Import necessary modules
import React from 'react';
import { Link } from 'react-router-dom';

// Define the BottomMenu component
const BottomMenu = () => {
  return (
    <div>
      <Link to="/home" style={styles.icon}>
        🏠 Home
      </Link>
      <Link to="/chat" style={styles.icon}>
        👤 Profile
      </Link>
      <Link to="/" style={styles.icon}>
        ⚙️ Settings
      </Link>
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
export default BottomMenu;
