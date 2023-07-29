import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for this component

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to the Image Processing Website</h1>
        <p>
          Upload your images and apply various image processing tasks like resizing,
          cropping, and more. You can also perform background removal and object
          recognition on your images.
        </p>
        <Link to="/upload">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
