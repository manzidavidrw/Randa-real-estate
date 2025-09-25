import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './CreatePlotForm.module.css';
import Loader from './Loader'; // Import Loader component

const CreatePlotForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [plotType, setPlotType] = useState('');
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const plotTypes = ['Imiturire', 'Ubuhinzi', 'Ubucuruzi']; // Example plot types

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submission

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('size', size);
    formData.append('plotType', plotType);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plots`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // FormData sets this automatically
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Plot creation failed');
      }

      toast.success('Plot created successfully!');
      // Clear form fields
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
      setSize('');
      setPlotType('');
      setImages(null);

    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <form className={styles.createPlotForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={loading} // Disable textarea while loading
        ></textarea>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="size">Size (sqm):</label>
        <input
          type="number"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="plotType">Plot Type:</label>
        <select
          id="plotType"
          value={plotType}
          onChange={(e) => setPlotType(e.target.value)}
          required
          disabled={loading} // Disable select while loading
        >
          <option value="">Select a plot type</option>
          {plotTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? <Loader small={true} /> : 'Create Plot'} {/* Show loader or text */}
      </button>
    </form>
  );
};

export default CreatePlotForm;
