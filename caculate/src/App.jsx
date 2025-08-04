import { useState } from "react";
import Header from "./components/Header";
import { Results } from "./components/Results";
import UserInput from "./components/UserInput";
import { calculateInvestmentResults } from "./util/investment";
import { ResultsChart } from "./components/ResultsChart";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;

  const resultsData = calculateInvestmentResults(userInput);

  function handleInputChange(inpuIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inpuIdentifier]: +newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput onChange={handleInputChange} userInput={userInput} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero!</p>
      )}
      {inputIsValid && (
        <>
          <ResultsChart resultsData={resultsData} />
          <Results resultsData={resultsData} />
        </>
      )}
    </>
  );
}

export default App;
