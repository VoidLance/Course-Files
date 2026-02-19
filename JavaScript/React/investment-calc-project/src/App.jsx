import Header from './components/Header.jsx'
import UserInput from './components/UserInput.jsx'
import {useState} from 'react'
import Output from './components/Output.jsx'


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


  return (
    <>
    <Header title="Investment Calculator" subtitle="Meet your finantial InVestMate" />
    <UserInput inputval={inputCust} callUserInput={callUserInput}/>
    <Output inputval={inputCust} />
    </>
  )
}

export default App
