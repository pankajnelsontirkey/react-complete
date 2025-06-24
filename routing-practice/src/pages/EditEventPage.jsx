import { useParams } from 'react-router-dom';

export default function EditEventPage() {
  const { eventId } = useParams();

  return <h1>Edit Event Page {eventId}</h1>;
}
