import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Upload.css'; // Import the CSS file for this component

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    setSelectedImage(imageFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="upload-container">
      <div className="content">
        <h2>Upload an Image</h2>
        <div
          className="drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="file-input"
          />
          <p>Drag & drop an image here or click to browse.</p>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="selected-image"
            />
          )}
        </div>
        <Link to={`/gallery/${selectedImage ? selectedImage.name : ''}`}>
          <button
            className="edit-btn"
            disabled={!selectedImage}
          >
            {selectedImage ? 'Edit Image' : 'Select an Image'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Upload;
