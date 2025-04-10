import { useState } from 'react';

import Header from './components/Header';
import UserInput from './components/UserInput';
import Results from './components/Results';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const handleUserInputChange = (identifier, value) => {
    setUserInput((prev) => ({ ...prev, [identifier]: value }));
  };

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onInputChange={handleUserInputChange} />
      <Results userInput={userInput} />
    </>
  );
}

export default App;
