import '../App.css'

const UserInput = ({callUserInput, inputval }) => {
  return(
    <section id='user-input'>
    <p className="input-group">
    <label htmlFor="initialInvestment">Beginning Investment ($)</label>
    <input type="number" id="initialInvestment" value={inputval.begInvestment} onChange={(e)=> callUserInput('begInvestment', e.target.value)} required min="0"/>
    </p>
    <p className="input-group">
    <label htmlFor="annualInvestment">Annual Investment ($)</label>
    <input type="number" id="annualInvestment" value={inputval.annInvestment} onChange={(e)=> callUserInput('annInvestment', e.target.value)} required min="0"/>
    </p>
    <p className="input-group">
    <label htmlFor="expectedReturn">Expected Return (%)</label>
    <input type="number" id="expectedReturn" value={inputval.returnInv} onChange={(e)=> callUserInput('returnInv', e.target.value)} required/>
    </p>
    <p className="input-group">
    <label htmlFor="yearlyInvestment">Duration (Years)</label>
    <input id="yearlyInvestment" type="number" value={inputval.yearInv} onChange={(e)=> callUserInput('yearInv', e.target.value)} required min="1"/>
    </p>
    </section>
  )
}

export default UserInput
