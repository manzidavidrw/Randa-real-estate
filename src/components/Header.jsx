import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";

const Header = ({ onSearchChange, onLoginClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>Randa Real Estate</div>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search by location, plot type..."
          className={styles.searchBarInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className={styles.searchButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
      <nav className={styles.nav}>
        <a href="#plots">Plots</a>
        <a href="#aboutUs">About Us</a>
      </nav>
      <div className={styles.headerActions}>
        <button className={styles.loginButton} onClick={onLoginClick}>Login</button>
        <a href="#" className={styles.userIcon} aria-label="User Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </a>
      </div>
    </header>
  );
};

export default Header;

