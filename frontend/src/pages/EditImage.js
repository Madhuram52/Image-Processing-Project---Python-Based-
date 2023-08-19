import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditImage.css'; // Import the CSS file for this component

const EditImage = () => {
  const { imageId } = useParams();
  const [selectedFunction, setSelectedFunction] = useState('');

  const handleFunctionClick = (funcName) => {
    setSelectedFunction(funcName);
  };

  // Function component for each feature
  const FeatureComponent = () => {
    switch (selectedFunction) {
      case 'crop':
        return <div className="feature-content">Crop feature content</div>;
      case 'resize':
        return <div className="feature-content">Resize feature content</div>;
      case 'filter':
        return <div className="feature-content">Filter feature content</div>;
      // Add more cases for other features as needed
      default:
        return <div className="feature-content">Select a function</div>;
    }
  };

  return (
    <div className="edit-container">
      <div className="function-buttons">
        <button onClick={() => handleFunctionClick('crop')}>Crop</button>
        <button onClick={() => handleFunctionClick('resize')}>Resize</button>
        <button onClick={() => handleFunctionClick('filter')}>Filter</button>
        {/* Add more function buttons as needed */}
      </div>
      <div className="features-area">
        <FeatureComponent />
      </div>
      <div className="image-area">
        <img src={`path/to/your/images/${imageId}`} alt="Selected" />
      </div>
    </div>
  );
};

export default EditImage;
