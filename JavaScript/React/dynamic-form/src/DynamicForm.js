import React, { useState } from 'react';

const DynamicForm = () => {
  const [inputValue, setInputValue] = useState('');
  let [outputValue, setOutputValue] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log('Input changed to:', event.target.value);
  };

  const handleReset = () => {
    setInputValue('');
    console.log('Input reset to empty string');
  };

  const handleSubmit = (event) => {
    if (inputValue.trim() === '') {
      alert('Input cannot be empty');
      return;
    }
    else if (inputValue.length < 3) {
      alert('Input must be at least 3 characters long');
      return;
    }
    else if (inputValue.length > 20) {
      alert('Input cannot exceed 20 characters');
      return;
    }
    else {
    event.preventDefault();
    setOutputValue((prevValues) => [...prevValues, inputValue]);
    console.log('Form submitted with value:', outputValue);
    setInputValue('');
    }
  };

  const resetOutputValue = () => {
    setOutputValue([]);
    console.log('Output values reset to empty array');
  };


  return (
    <div>
      <h1>Dynamic Form</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <button onClick={resetOutputValue}>Reset Output</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>Current Input:</h2>
        <p>{inputValue}</p>
        <h2>Input Length:</h2>
        <p>{inputValue.length}</p>
        <h2>Submitted Values:</h2>
        <ul>
          {outputValue.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicForm;
