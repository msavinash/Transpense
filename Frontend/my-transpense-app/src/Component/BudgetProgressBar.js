import React from 'react';

const BudgetProgressBar = ({ spent, available }) => {
  const total = spent + available;
  const spentPercentage = (spent / total) * 100;
  const availablePercentage = (available / total) * 100;

  // Define styles with reduced border-radius
  const containerStyle = {
    display: 'flex',
    width: '80%',
    margin: '0 auto', // Added margin auto to center the progress bar
    backgroundColor: '#e0e0de',
    borderRadius: '5px', // Reduced border-radius for the container
    overflow: 'hidden', // This ensures the inner divs don't overflow the border radius
    height: '30px', // Height of the container
  };

  const spentStyle = {
    width: `${spentPercentage}%`,
    backgroundColor: '#ff6c5c',
    color: 'white',
    display: 'flex',
    alignItems: 'center', // Center the text vertically
    justifyContent: 'center', // Center the text horizontally
    height: '100%', // Use full height of the container
    // No need for individual border-radius here since the container clips the content
  };

  const availableStyle = {
    width: `${availablePercentage}%`,
    backgroundColor: '#4caf50',
    color: 'white',
    display: 'flex',
    alignItems: 'center', // Center the text vertically
    justifyContent: 'center', // Center the text horizontally
    height: '100%', // Use full height of the container
    // No need for individual border-radius here since the container clips the content
  };

  return (
    <div style={containerStyle}>
      <div style={spentStyle}>Sp. {spent}$</div>
      <div style={availableStyle}>Av. {available}$</div>
    </div>
  );
};

export default BudgetProgressBar;
