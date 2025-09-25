import React, { useState } from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ onFilterChange }) => {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [plotType, setPlotType] = useState('');

  const plotTypes = ['Imiturire', 'Ubuhinzi', 'Ubucuruzi']; // Example plot types

  const handleFilterChangeInternal = ({ newLocation = location, newMinPrice = minPrice, newMaxPrice = maxPrice, newPlotType = plotType }) => {
    onFilterChange({
      location: newLocation,
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
      plotType: newPlotType,
    });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    handleFilterChangeInternal({ newLocation: value });
  };

  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setMinPrice(value);
    handleFilterChangeInternal({ newMinPrice: value });
  };

  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setMaxPrice(value);
    handleFilterChangeInternal({ newMaxPrice: value });
  };

  const handlePlotTypeClick = (type) => {
    const newPlotType = plotType === type ? '' : type; // Toggle selection
    setPlotType(newPlotType);
    handleFilterChangeInternal({ newPlotType: newPlotType });
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="e.g., Kabuga"
          value={location}
          onChange={handleLocationChange}
          className={`${styles.filterInput} ${styles.locationFilterInput}`}
        />
      </div>

      <div className={styles.filterGroup}>
        <label>Price Range</label>
        <div className={styles.priceRange}>
          <span>Min: ${minPrice.toLocaleString()}</span>
          <input
            type="range"
            min="0"
            max="50000000"
            step="100000"
            value={minPrice}
            onChange={handleMinPriceChange}
            className={styles.priceSlider}
          />
          <span>Max: ${maxPrice.toLocaleString()}</span>
          <input
            type="range"
            min="0"
            max="50000000"
            step="100000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className={styles.priceSlider}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Plot Type</label>
        <div className={styles.plotTypeButtons}>
          {plotTypes.map((type) => (
            <button
              key={type}
              className={`${styles.typeButton} ${plotType === type ? styles.active : ''}`}
              onClick={() => handlePlotTypeClick(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
