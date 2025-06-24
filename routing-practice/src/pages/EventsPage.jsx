import { Link } from 'react-router-dom';

const DUMMY_EVENTS = [
  { id: 'e1', title: 'event 1' },
  { id: 'e2', title: 'event 2' },
  { id: 'e3', title: 'event 3' },
  { id: 'e4', title: 'event 4' },
  { id: 'e5', title: 'event 5' }
];

export default function EventsPage() {
  return (
    <>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id} relative='path'>
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
