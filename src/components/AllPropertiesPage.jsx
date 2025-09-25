import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import FilterBar from './FilterBar';
import PlotList from './PlotList';
import styles from './AllPropertiesPage.module.css';
import Loader from './Loader'; // Import Loader component

const AllPropertiesPage = () => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [plotsPerPage] = useState(5); // New state for plots per page (5 per page)

  useEffect(() => {
    const fetchPlots = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          ...(filters.location && { location: filters.location }),
          ...(filters.minPrice && { minPrice: filters.minPrice }),
          ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
          ...(filters.plotType && { plotType: filters.plotType }),
          ...(searchTerm && { searchTerm: searchTerm }),
        }).toString();

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plots/public/search?${queryParams}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlots(data);
      } catch (e) {
        setError("Failed to fetch plots: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlots();
  }, [filters, searchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Get current plots for pagination
  const indexOfLastPlot = currentPage * plotsPerPage;
  const indexOfFirstPlot = indexOfLastPlot - plotsPerPage;
  const currentPlots = plots.slice(indexOfFirstPlot, indexOfLastPlot);

  // Calculate page numbers
  const totalPages = Math.ceil(plots.length / plotsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.allPropertiesPage}>
      <h1 className={styles.pageHeader}>All Available Properties</h1>
      <FilterBar onFilterChange={handleFilterChange} />
      {loading && <Loader />} {/* Replaced loading paragraph with Loader component */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && plots.length === 0 && <p>No properties found matching your criteria.</p>}
      {!loading && !error && plots.length > 0 && (
        <>
          <PlotList plots={currentPlots} displayAsList={true} />
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
        </>
      )}
    </div>
  );
};

export default AllPropertiesPage;
