import React from 'react'
import { calculateInvestmentResults } from '../util/investments';
import './Output.css'

const Output = ({inputval}) => {
  const resdata = calculateInvestmentResults({
  initialInvestment: +inputval.begInvestment,
  annualInvestment: +inputval.annInvestment,
  expectedReturn: +inputval.returnInv,
  duration: +inputval.yearInv
});

  const maxInterest = Math.max(...resdata.map((data) => data.interest));

  return (
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
      {resdata.map((yearData, index) => (
        <tr key={index}
        style={{
              backgroundColor: yearData.interest === maxInterest ? 'lightgreen' : 'transparent',
            }}>
          <td>{yearData.year}</td>
          <td>{yearData.investmentValue.toFixed(2)}</td>
          <td>{yearData.interest.toFixed(2)}</td>
          <td>{yearData.totalInterest.toFixed(2)}</td>
          <td>{yearData.investedCapital.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

}

export default Output
