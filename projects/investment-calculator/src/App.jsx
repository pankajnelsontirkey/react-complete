import { useState } from 'react';

import Header from './components/Header';
import Results from './components/Results';
import UserInput from './components/UserInput';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const handleUserInputChange = (identifier, value) => {
    setUserInput((prev) => ({ ...prev, [identifier]: +value }));
  };

  const isUserInputValid = userInput.duration >= 1;

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onInputChange={handleUserInputChange} />
      {!isUserInputValid && (
        <p className='center'>Please enter a duration greater than 0</p>
      )}
      {isUserInputValid && <Results userInput={userInput} />}
    </>
  );
}

export default App;
