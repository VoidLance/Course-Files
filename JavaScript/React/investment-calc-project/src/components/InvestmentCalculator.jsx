import React, { useState } from 'react';
import { calculateInvestmentResults } from '../util/investments';
import { generatepdf } from '../util/generatereport';

const InvestmentCalculator = () => {
  const [inputCustomer, setInputCustomer] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputCustomer(prevState => ({
      ...prevState,
      [name]: Number(value)
    }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateInvestmentResults(inputCustomer);
    setResults(calculatedResults);
  };

  const handleGeneratePDF = () => {
    if (results) {
      generatepdf({ ...inputCustomer, results });
    }
  };

  const userEnteredValid = inputCustomer.duration >= 1;

  return (
    <div className="investment-calculator">
      <div className="inputs">
        <input
          type="number"
          name="initialInvestment"
          value={inputCustomer.initialInvestment}
          onChange={handleInputChange}
          placeholder="Initial Investment"
        />
        <input
          type="number"
          name="annualInvestment"
          value={inputCustomer.annualInvestment}
          onChange={handleInputChange}
          placeholder="Annual Investment"
        />
        <input
          type="number"
          name="expectedReturn"
          value={inputCustomer.expectedReturn}
          onChange={handleInputChange}
          placeholder="Expected Return (%)"
        />
        <input
          type="number"
          name="duration"
          value={inputCustomer.duration}
          onChange={handleInputChange}
          placeholder="Duration (years)"
        />
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {!userEnteredValid && (
        <p className="error-message">Please ensure that years invested are greater than zero.</p>
      )}

      {userEnteredValid && results && (
        <div className="results">
          <h2>Investment Results</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
              </tr>
            </thead>
            <tbody>
              {results.map((yearData, index) => (
                <tr key={index}>
                  <td>{yearData.year}</td>
                  <td>${yearData.investmentValue.toFixed(2)}</td>
                  <td>${yearData.interest.toFixed(2)}</td>
                  <td>${yearData.totalInterest.toFixed(2)}</td>
                  <td>${yearData.investedCapital.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleGeneratePDF}>Download PDF Report</button>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
