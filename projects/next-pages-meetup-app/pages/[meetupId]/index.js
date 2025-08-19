import MeetupDetails from '@/components/meetups/MeetupDetails';

export default function MeetupDetailsPage({ details }) {
  return (
    <>
      <MeetupDetails {...details} />
    </>
  );
}
