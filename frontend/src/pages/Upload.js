import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Upload.css'; // Import the CSS file for this component



const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

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

  const uploadImageToServer = async () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageId = data._id;
        
        console.log('Image uploaded successfully');
        console.log('Image ID:', imageId);
        // After successful upload, navigate to the edit image page
        // navigate('/gallery/'); // Replace :imageid with the actual image ID
        navigate(`/gallery/${imageId}`);
      } else {
        console.error('Image upload failed');
        // Handle the error, e.g., show an error message to the user.
      }
    } catch (error) {
      console.error('Image upload error:', error);
      // Handle network errors or other exceptions here.
    }
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
          <label htmlFor="file-input" className="file-label">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              id="file-input"
              className="file-input"
            />
            <p>Drag & drop an image here or click to browse.</p>
          </label>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="selected-image"
            />
          )}
        </div>
        {selectedImage ? (
          <button className="edit-btn" onClick={uploadImageToServer}>
            Upload Image
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Upload;
