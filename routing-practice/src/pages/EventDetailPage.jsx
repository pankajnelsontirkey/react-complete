import { useNavigate, useParams } from 'react-router-dom';

export default function EventDetailPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const handleNavigateBack = () => {
    navigate('..', { relative: 'path' });
  };

  return (
    <>
      <h1>Event Details Page {eventId}</h1>
      <p>
        <button onClick={handleNavigateBack}>Back</button>
      </p>
    </>
  );
}
