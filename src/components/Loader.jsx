import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ small }) => {
  return (
    <div className={small ? styles.smallLoaderContainer : styles.loaderContainer}>
      <div className={small ? styles.smallSpinner : styles.spinner}></div>
      {!small && <p>Loading...</p>}
    </div>
  );
};

export default Loader;
