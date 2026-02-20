import { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Output from "./components/Output.jsx";
import Chart from "./components/Chart.jsx";
import { calculateInvestmentResults } from "./util/investments.js";
import { generatepdf } from "./util/generatereport.js";

function App() {
  const chartRef = useRef(); // Create a ref for the chart

  const [inputCust, setInputCust] = useState({
    begInvestment: 4000,
    annInvestment: 1200,
    returnInv: 6,
    yearInv: 35,
  });

  function callUserInput(inputIde, val) {
    setInputCust((prev) => ({
      ...prev,
      [inputIde]: +val,
    }));
  }

  function handleGenerateReport(file) {
    const resdata = calculateInvestmentResults({
      initialInvestment: +inputCust.begInvestment,
      annualInvestment: +inputCust.annInvestment,
      expectedReturn: +inputCust.returnInv,
      duration: +inputCust.yearInv,
    });

    console.log("current input: ", inputCust);
    console.log("current results:", resdata);

    if (file === "pdf") {
      generatepdf({ ...inputCust, results: resdata }, chartRef); // Pass chartRef here
    }
  }

  return (
    <>
      <Header title="Investment Calculator" subtitle="Meet your financial InVestMate" />
      <UserInput inputval={inputCust} callUserInput={callUserInput} />
      <Output inputval={inputCust} />
      <div ref={chartRef}>
        {/* Attach the ref to the chart container */}
        <Chart
          Data={calculateInvestmentResults({
            initialInvestment: +inputCust.begInvestment,
            annualInvestment: +inputCust.annInvestment,
            expectedReturn: +inputCust.returnInv,
            duration: +inputCust.yearInv,
          })}
        />
      </div>
      <button onClick={() => handleGenerateReport("pdf")}>Generate PDF Report</button>
    </>
  );
}

export default App;
