import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./Header.module.css";

const Header = ({ onSearchChange, onLoginClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility
  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleLogoClick = () => {
    navigate('/');
    if (isMenuOpen) toggleMenu(); // Close menu if open
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}> {/* Add menuOpen class conditionally */}
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

      {!isDashboard && (
        <>
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
        </>
      )}

      {!isDashboard && (
      <button className={styles.hamburgerButton} onClick={toggleMenu}> {/* Hamburger button */}
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>
      )}

      {!isDashboard && (
        <>
          <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}> {/* Mobile menu container */}
            <nav className={styles.navMobile}>
              <a href="#plots" onClick={toggleMenu}>Plots</a>
              <a href="#aboutUs" onClick={toggleMenu}>About Us</a>
            </nav>
            <div className={styles.headerActionsMobile}>
              <button className={styles.loginButton} onClick={() => { onLoginClick(); toggleMenu(); }}>Login</button>
              <a href="#" className={styles.userIcon} aria-label="User Profile" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </a>
            </div>
          </div>
          {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>} {/* Overlay for mobile menu */}
        </>
      )}
    </header>
  );
};

export default Header;

