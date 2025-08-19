import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '@/components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(meetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('🚀 ~ index.js:16 ~ addMeetupHandler ~ data:', data);

    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta name='description' content='Create your own meetup event.' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
