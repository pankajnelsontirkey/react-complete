import { useState } from 'react';
import { styled } from 'styled-components';

import Button from './Button';
import Input from './Input';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (identifier, value) => {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  };

  const handleLogin = () => {
    setSubmitted(true);
  };

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id='auth-inputs'>
      <ControlsContainer>
        <Input
          type='email'
          onChange={(e) => handleInputChange('email', e.target.value)}
          label='Email'
          $invalid={emailNotValid}
        />
        <Input
          type='password'
          onChange={(e) => handleInputChange('password', e.target.value)}
          label='Password'
          $invalid={passwordNotValid}
        />
      </ControlsContainer>
      <div className='actions'>
        <button type='button' className='text-button'>
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
