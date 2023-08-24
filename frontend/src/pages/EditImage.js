import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditImage.css'; // Import the CSS file for this component

const EditImage = () => {
  const { imageid } = useParams();
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    // Fetch the image URL from your Flask server based on imageid
    fetch(`http://localhost:5000/api/gallery/${imageid}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Image not found');
        }
      })
      .then((data) => {
        setImageURL(data.imageURL);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, [imageid]);

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
