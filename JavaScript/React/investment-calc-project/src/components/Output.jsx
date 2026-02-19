import React from 'react'
import { calculateInvestmentResults, formatter } from '../util/investments';
import './Output.css'

const Output = ({inputval}) => {
  if (inputval.yearInv <= 0) {
      return <p className="error">Please enter a duration greater than zero.</p>;
    }
  const resdata = calculateInvestmentResults({
  initialInvestment: +inputval.begInvestment,
  annualInvestment: +inputval.annInvestment,
  expectedReturn: +inputval.returnInv,
  duration: +inputval.yearInv
});

  const totalInvested = resdata.reduce((sum, data) => sum + data.investedCapital, 0);
  const totalInterest = resdata.reduce((sum, data) => sum + data.interest, 0);


  const maxInterest = Math.max(...resdata.map((data) => data.interest));
  return (
    <>
    <div className="Table">
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
      {resdata.map((yearData) => {
      return (
      <tr
      key={yearData.year}
      className={yearData.interest === maxInterest ? 'highest-interest' : 'normal'}
      >
        <td>{yearData.year}</td>
        <td>{formatter.format(yearData.investmentValue)}</td>
        <td>{formatter.format(yearData.interest)}</td>
        <td>{formatter.format(yearData.totalInterest)}</td>
        <td>{formatter.format(yearData.investedCapital)}</td>
      </tr>
    );
  })}
    </tbody>
  </table>
    </div>
    <div className="summary">
    <h1>Summary</h1>
    <p>Total amount invested: ${totalInvested}</p>
    <p>Total interest earned: ${totalInterest}</p>
    </div>
    </>
);

}

export default Output
