import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './ManagePlots.module.css';
import Loader from './Loader'; // Import Loader component

const ManagePlots = () => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [plotsPerPage] = useState(4); // New state for plots per page
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchAdminPlots = async () => {
      if (!username) {
        setError('Admin username not found in local storage. Please log in.');
        setLoading(false);
        toast.error('Admin username not found. Please log in.');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plots/my-plots?username=${username}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch plots');
        }

        const data = await response.json();
        setPlots(data);
      } catch (e) {
        setError('Error fetching plots: ' + e.message);
        toast.error('Error fetching plots: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminPlots();
  }, [username]);

  if (loading) {
    return <div className={styles.managePlotsContainer}><Loader /></div>; {/* Replaced loading paragraph with Loader component */}
  }

  if (error) {
    return <div className={styles.managePlotsContainer}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  // Get current plots for pagination
  const indexOfLastPlot = currentPage * plotsPerPage;
  const indexOfFirstPlot = indexOfLastPlot - plotsPerPage;
  const currentPlots = plots.slice(indexOfFirstPlot, indexOfLastPlot);

  // Calculate page numbers
  const totalPages = Math.ceil(plots.length / plotsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.managePlotsContainer}>
      {plots.length === 0 ? (
        <p>No plots found for this admin.</p>
      ) : (
        <div className={styles.plotsGrid}>
          {currentPlots.map((plot) => (
            <div key={plot.id} className={styles.plotCard}>
              <img src={plot.imageUrls[0]} alt={plot.title} className={styles.plotImage} />
              <div className={styles.plotInfo}>
                <h3>{plot.title}</h3>
                <p>{plot.location}</p>
                <p>${plot.price.toLocaleString()}</p>
                <div className={styles.plotActions}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManagePlots;
