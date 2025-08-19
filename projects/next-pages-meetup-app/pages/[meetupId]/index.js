import MeetupDetails from '@/components/meetups/MeetupDetails';

export default function MeetupDetailsPage({ details }) {
  return (
    <>
      <MeetupDetails {...details} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      },
      {
        params: {
          meetupId: 'm3'
        }
      }
    ]
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      details: {
        id: 'm1',
        title: 'First Mixer',
        image:
          'https://fastly.picsum.photos/id/152/300/300.jpg?hmac=dm_GPki-2zVGdmmOTDJdIQzItJi7zC0gbCSSw4N2Hxk',
        address: 'Some address'
      }
    }
  };
}
