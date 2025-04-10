export default function UserInput({ userInput, onInputChange }) {
  return (
    <section id='user-input'>
      <div className='input-group'>
        <p>
          <label>Initial Investment</label>
          <input
            type='number'
            value={userInput.initialInvestment}
            required
            onChange={(e) => onInputChange('initialInvestment', e.target.value)}
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            type='number'
            value={userInput.annualInvestment}
            required
            onChange={(e) => onInputChange('annualInvestment', e.target.value)}
          />
        </p>
        <p>
          <label>Expected Return</label>
          <input
            type='number'
            value={userInput.expectedReturn}
            required
            onChange={(e) => onInputChange('expectedReturn', e.target.value)}
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type='number'
            value={userInput.duration}
            required
            onChange={(e) => onInputChange('duration', e.target.value)}
          />
        </p>
      </div>
    </section>
  );
}
