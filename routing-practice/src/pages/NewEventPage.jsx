import { useNavigate } from 'react-router-dom';

export default function NewEventPage() {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate('..', { relative: 'path' });
  };
  return (
    <>
      <h1>New Event Page</h1>
      <p>
        <button onClick={handleNavigateBack}>Back</button>
      </p>
    </>
  );
}
