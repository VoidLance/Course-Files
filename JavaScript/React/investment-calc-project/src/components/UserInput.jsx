import React, {useState} from 'react'
import '../App.css'

const UserInput = () => {
const [inputCust, setInputCust] = useState({
    begInvestment:4000,
    annInvestment:1200,
    returnInv:6,
    yearInv:35
})

  function callUserInput (inputIde, val) {
    setInputCust((prev) => ({
       ...prev,
        [inputIde]: val
    }));
  }

  return(
    <section id='user-input'>
    <p className="input-group">
    <label htmlFor="initialInvestment">Beginning Investment ($)</label>
    <input type="number" id="initialInvestment" value={inputCust.begInvestment} onChange={(e)=> callUserInput('begInvestment', e.target.value)} required/>
    </p>
    <p className="input-group">
    <label htmlFor="annualInvestment">Annual Investment ($)</label>
    <input type="number" id="annualInvestment" value={inputCust.annInvestment} onChange={(e)=> callUserInput('annInvestment', e.target.value)} required/>
    </p>
    <p className="input-group">
    <label htmlFor="expectedReturn">Expected Return ($)</label>
    <input type="number" id="expectedReturn" value={inputCust.returnInv} onChange={(e)=> callUserInput('returnInv', e.target.value)} required/>
    </p>
    <p className="input-group">
    <label htmlFor="yearlyInvestment">Yearly Investment ($)</label>
    <input id="yearlyInvestment" type="number" value={inputCust.yearInv} onChange={(e)=> callUserInput('yearInv', e.target.value)}/>
    </p>
    </section>
  )
}

export default UserInput
