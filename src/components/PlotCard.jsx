import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PlotCard.module.css';

const PlotCard = ({ plot, displayAsList }) => {
  return (
    <div className={`${styles.plotCard} ${displayAsList ? styles.listView : ''}`}>
      <div className={styles.plotImageContainer}>
        <img src={plot.imageUrls[0]} alt={plot.title} className={styles.plotImage} />
        <div className={styles.plotTypeBadge}>{plot.plotType}</div>
      </div>
      <div className={styles.plotInfo}>
        <h3 className={styles.plotTitle}>{plot.title}</h3>
        <p className={styles.plotLocation}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {plot.location}
        </p>
        <div className={styles.plotDetails}>
          <span className={styles.detailItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3m-18 0v3a2 2 0 0 0 2 2h3"></path></svg>
            {plot.size} sqm
          </span>
          <span className={styles.plotPrice}>${plot.price.toLocaleString()}</span>
        </div>
        <Link to={`/plots/${plot.id}`} className={styles.viewDetailsButton}>View Details</Link>
      </div>
    </div>
  );
};

export default PlotCard;
