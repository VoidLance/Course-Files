import React from 'react';

const StyledButton = () => {
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: 'outset',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    height: 'auto',
    backgroundColor: '#f0f0f0',
  };
  const headingStyle = {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    alignText: 'center',
    backgroundColor: '#e0e0e0',
    padding: '10px',
    borderRadius: '5px',
  };

  let isDisabled = false;

  const buttonStyle = {
    backgroundColor: isDisabled ? 'gray' : '#007',
    color: 'white',
    padding: '10px 20px',
    border: 'outset',
    bordercolor: isDisabled ? 'darkgray' : '#0056',
    borderRadius: '5px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
  };

  function disableButton(button) {
    button.style.backgroundColor = 'gray';
    button.style.borderColor = 'darkgray';
    button.style.cursor = 'not-allowed';
    button.style.opacity = 0.5;
    isDisabled = true;
    console.log('Button disabled');
  }
 function addHoverEffect(button) {
    button.addEventListener('mouseenter', () => {
      if (!isDisabled) {
        button.style.backgroundColor = '#ef5350';
      }
    });
    button.addEventListener('mouseleave', () => {
      if (!isDisabled) {
        button.style.backgroundColor = '#007BFF';
      }
    });
  }

  return (
    <>
    <div style={pageStyle}>
      <h1 style={headingStyle}>Welcome to the Styled Button Page</h1>
    <button
    ref={(button) => button && addHoverEffect(button)}
    onClick= {(e) => {disableButton(e.target)}}
    className="styled-button"
    style={buttonStyle}
    disabled={isDisabled}
    >
      Click Me
    </button>
    </div>
    </>
  );
};

export default StyledButton;
