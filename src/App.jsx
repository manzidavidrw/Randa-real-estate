import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PlotList from "./components/PlotList";
import FilterBar from "./components/FilterBar"; // Import FilterBar
import LoginModal from "./components/LoginModal"; // Import LoginModal
import styles from "./App.module.css";
import PlotDetails from "./components/PlotDetails"; // Import PlotDetails
import Dashboard from "./components/Dashboard"; // Import Dashboard
// import FeaturedPlotsSlider from "./components/FeaturedPlotsSlider"; // Import FeaturedPlotsSlider
import TestimonialsSlider from "./components/TestimonialsSlider"; // Import TestimonialsSlider
import AllPropertiesPage from "./components/AllPropertiesPage"; // Import AllPropertiesPage
import Loader from "./components/Loader"; // Import Loader component

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userToken');
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Initialize useNavigate

  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL); // Add this line for debugging

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

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className={styles.app}>
      <Header onSearchChange={handleSearchChange} onLoginClick={openLoginModal} />
      <Routes>
        <Route path="/plots/:id" element={<PlotDetails />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route
          path="/"
          element={
            <>
              <section className={styles.hero}>
                <h1>Find Your Perfect Property, Effortlessly.</h1>
                <p>Explore an exclusive selection of properties curated just for you. Your dream home or investment opportunity awaits.</p>
                <button className={styles.heroButton}>Browse Properties</button>
              </section>

              <section className={styles.aboutUs}>
                <h2>Why Choose Randa Real Estate?</h2>
                <p>
                  At Randa Real Estate, we are dedicated to helping you find the perfect piece of land.
                  With years of experience and a deep understanding of the local market, we offer unparalleled
                  expertise and a personalized approach to every client. Whether you're looking for a plot
                  to build your dream home, invest in agriculture, or develop a commercial property,
                  we have a diverse portfolio to meet your needs. Trust us to guide you home.
                </p>
                <div className={styles.featuresGrid}>
                  <div className={styles.featureItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                    <h3>Expert Local Knowledge</h3>
                    <p>Our team possesses an in-depth understanding of the local real estate market.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.89"></polyline></svg>
                    <h3>Unmatched Customer Service</h3>
                    <p>We prioritize your needs, offering personalized and attentive support.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <h3>Secure & Transparent Deals</h3>
                    <p>Ensuring clarity and security in every transaction you make.</p>
                  </div>
                </div>
              </section>

              {/* <FeaturedPlotsSlider plots={plots} /> */}

              <h2 className={styles.propertiesHeader}>Available Properties</h2>
              <FilterBar onFilterChange={handleFilterChange} />
              {loading && <Loader />} {/* Replaced loading paragraph with Loader component */}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!loading && !error && (
                <>
                  <PlotList plots={plots.slice(0, 3)} /> {/* Show only 3 plots */}
                  {plots.length > 3 && (
                    <div className={styles.viewMoreButtonContainer}>
                      <button
                        onClick={() => navigate('/all-properties')}
                        className={styles.viewMoreButton}
                      >
                        View All Properties
                      </button>
                    </div>
                  )}
                </>
              )}

              <TestimonialsSlider /> {/* Moved TestimonialsSlider here */}
            </>
          }
        />
        <Route path="/all-properties" element={<AllPropertiesPage />} /> {/* New route for all properties */}
      </Routes>
      <Footer />
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;
