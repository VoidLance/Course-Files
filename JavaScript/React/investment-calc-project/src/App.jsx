import Header from './components/Header.jsx'
import UserInput from './components/UserInput.jsx'
import {useState} from 'react'
import Output from './components/Output.jsx'
import { calculateInvestmentResults } from './util/investments.js'
import {generatepdf, /*generatedocx*/} from './util/generatereport.js'


function App() {

const [inputCust, setInputCust] = useState({
    begInvestment:4000,
    annInvestment:1200,
    returnInv:6,
    yearInv:35
})

  function callUserInput (inputIde, val) {
    setInputCust((prev) => ({
       ...prev,
        [inputIde]: +val
    }));
  }

  function handleGenerateReport(file) {
    const resdata=calculateInvestmentResults({initialInvestment: +inputCust.begInvestment,
      annualInvestment: +inputCust.annInvestment,
      expectedReturn: +inputCust.returnInv,
      duration: +inputCust.yearInv}
);

    console.log("current input: ", inputCust)
    console.log("current results:", resdata)
    if (file === 'pdf') {
      generatepdf({...inputCust, results: resdata})
    }
    else {
      //generatedocx({...inputCust, results: resdata})
    }
  }

  return (
    <>
    <Header title="Investment Calculator" subtitle="Meet your finantial InVestMate" />
    <UserInput inputval={inputCust} callUserInput={callUserInput}/>
    <Output inputval={inputCust} />
    <button onClick={()=> handleGenerateReport('pdf')}>Generate PDF Report</button>
    {/* <button onClick={()=> handleGenerateReport('docx')}>Generate Document Report</button> */}
    </>
  )
}

export default App
