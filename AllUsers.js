import React from 'react';

const Button = () => {
  const handleClick = () => {
    
    window.location.href = "/shownotes";
  };

  return (
    <button onClick={handleClick}>Profile</button>
  );
};

export default Button;
