import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { toast } from 'react-toastify';
import RegisterAdminForm from './RegisterAdminForm'; // Import RegisterAdminForm
import CreatePlotForm from './CreatePlotForm'; // Import CreatePlotForm
import ManagePlots from './ManagePlots'; // Import ManagePlots

// Reusable Theme Toggle Component
const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <label className={styles.themeToggleSwitch}>
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className={styles.sliderRound}></span>
    </label>
  );
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('managePlots');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    toast.info('You have been logged out.');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'registerAdmin':
        return (
          <div className={styles.dashboardSection}>
            <h2>Register New Admin</h2>
            <RegisterAdminForm />
          </div>
        );
      case 'createPlot':
        return (
          <div className={styles.dashboardSection}>
            <h2>Create New Plot</h2>
            <CreatePlotForm />
          </div>
        );
      case 'managePlots':
        return (
          <div className={styles.dashboardSection}>
            <h2>Manage Your Plots</h2>
            <ManagePlots />
          </div>
        );
      case 'settings':
        return (
          <div className={`${styles.dashboardSection} ${styles.settings}`}>
            <h2>Settings</h2>
            <div className={styles.settingItem}>
              <span>Dark Mode:</span>
              <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.dashboardSection}>
            <h2>Welcome to Admin Dashboard</h2>
            <p>Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <a href="#" className={activeSection === 'registerAdmin' ? styles.active : ''} onClick={() => setActiveSection('registerAdmin')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
            Register Admin
          </a>
          <a href="#" className={activeSection === 'createPlot' ? styles.active : ''} onClick={() => setActiveSection('createPlot')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create Plot
          </a>
          <a href="#" className={activeSection === 'managePlots' ? styles.active : ''} onClick={() => setActiveSection('managePlots')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            Manage Plots
          </a>
          <a href="#" className={activeSection === 'settings' ? styles.active : ''} onClick={() => setActiveSection('settings')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 5.09 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82-.33H9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V15h.09z"></path></svg>
            Settings
          </a>
        </nav>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
      <div className={styles.dashboardContent}>
        <h1>Dashboard Overview</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
