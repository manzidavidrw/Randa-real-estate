import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './RegisterAdminForm.module.css';
import Loader from './Loader'; // Import Loader component

const RegisterAdminForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submission
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, password, phoneNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Admin registration failed');
      }

      toast.success('Admin registered successfully!');
      // Clear form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');

    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className={styles.registerAdminForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="adminUsername">Username:</label>
        <input
          type="text"
          id="adminUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="adminEmail">Email:</label>
        <input
          type="email"
          id="adminEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="adminPassword">Password:</label>
        <div className={styles.passwordInputContainer}> {/* New container for input and toggle */}
          <input
            type={showPassword ? 'text' : 'password'} // Toggle type based on state
            id="adminPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading} // Disable input while loading
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.passwordToggleButton}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={loading} // Disable toggle button while loading
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.09 18.09 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="adminPhoneNumber">Phone Number:</label>
        <input
          type="text"
          id="adminPhoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? <Loader small={true} /> : 'Register Admin'} {/* Show loader or text */}
      </button>
    </form>
  );
};

export default RegisterAdminForm;
