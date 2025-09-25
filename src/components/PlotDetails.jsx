import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PlotDetails.module.css';
import Loader from './Loader'; // Import Loader component

const PlotDetails = () => {
  const { id } = useParams();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlotDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plots/public/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlot(data);
      } catch (e) {
        setError("Failed to fetch plot details: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlotDetails();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.plotDetailsContainer}>
        <Loader /> {/* Replaced loading paragraph with Loader component */}
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.plotDetailsContainer}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }
  if (!plot) {
    return (
      <div className={styles.plotDetailsContainer}>
        <p>Plot not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.plotDetailsContainer}>
      <div className={styles.plotHeader}>
        <h1>{plot.title}</h1>
        <p className={styles.plotLocation}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {plot.location}
        </p>
      </div>
      <div className={styles.plotImages}>
        {plot.imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`${plot.title} ${index + 1}`} className={styles.plotImage} />
        ))}
      </div>
      <div className={styles.plotInfoGrid}>
        <div className={styles.infoItem}>
          <strong>Price:</strong> ${plot.price.toLocaleString()}
        </div>
        <div className={styles.infoItem}>
          <strong>Size:</strong> {plot.size} sqm
        </div>
        <div className={styles.infoItem}>
          <strong>Plot Type:</strong> {plot.plotType}
        </div>
        <div className={styles.infoItem}>
          <strong>Description:</strong> {plot.description}
        </div>
        {plot.admin && (
          <div className={styles.adminInfo}>
            <h3>Contact Admin</h3>
            <p><strong>Email:</strong> {plot.admin.email}</p>
            <p><strong>Phone:</strong> {plot.admin.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlotDetails;
