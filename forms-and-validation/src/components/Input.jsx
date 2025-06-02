export default function Input({ label, id, error, ...props }) {
  return (
    <div className='control no-margin'>
      <label htmlFor='email'>{label}</label>
      <input {...props} id={id} />
      <div className='control-error'>{error ? <p>{error}</p> : null}</div>
    </div>
  );
}
