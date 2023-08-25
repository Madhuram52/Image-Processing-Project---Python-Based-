import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditImage.css'; // Import the CSS file for this component

const EditImage = () => {
  const { imageId } = useParams();
  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
    // Fetch the image URL from your Flask server based on imageId
    fetch(`http://localhost:5000/api/gallery/${imageId}`)
      .then((response) => {
        if (response.ok) {
          return response.url; // Get the URL of the image
        } else {
          throw new Error('Image not found');
        }
      })
      .then((imageUrl) => {
        setImageURL(imageUrl); // Set the imageURL state with the image URL
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, [imageId]);
  


  return (
    <div className="edit-image-container">
      <div className="content">
        <h2>Edit Image</h2>
        {imageURL ? (
          <img src={imageURL} alt="Uploaded" className="uploaded-image" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </div>
  );
};

export default EditImage;
