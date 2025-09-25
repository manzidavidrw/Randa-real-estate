import React, { useRef } from 'react';
import styles from './TestimonialsSlider.module.css';

const testimonials = [
  {
    id: 1,
    quote: "Randa Real Estate made finding our dream plot a breeze! Their team was incredibly helpful and knowledgeable.",
    author: "Jean Pierre",
    location: "Kigali, Rwanda",
  },
  {
    id: 2,
    quote: "Professional and efficient service. We found the perfect agricultural land thanks to their diverse listings.",
    author: "Aisha N. ",
    location: "Musanze, Rwanda",
  },
  {
    id: 3,
    quote: "Highly recommend Randa Real Estate. The entire process was transparent and stress-free. Great experience!",
    author: "David K.",
    location: "Rubavu, Rwanda",
  },
  {
    id: 4,
    quote: "The best real estate experience I've had. They truly understand client needs and deliver. Thank you!",
    author: "Sarah M.",
    location: "Huye, Rwanda",
  },
  {
    id: 5,
    quote: "Impeccable service and a fantastic selection of properties. Randa Real Estate is highly reliable.",
    author: "Emmanuel G.",
    location: "Muhanga, Rwanda",
  },
];

const TestimonialsSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (scrollOffset) => {
    sliderRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={styles.testimonialsSliderContainer}>
      <h2>What Our Clients Say</h2>
      <div className={styles.sliderControls}>
        <button onClick={() => scroll(-300)} className={styles.scrollButton}>
          &lt;
        </button>
        <div className={styles.testimonialsSlider} ref={sliderRef}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <p className={styles.quote}>\" {testimonial.quote} \"</p>
              <p className={styles.author}>- {testimonial.author}</p>
              <p className={styles.location}>{testimonial.location}</p>
            </div>
          ))}
        </div>
        <button onClick={() => scroll(300)} className={styles.scrollButton}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
