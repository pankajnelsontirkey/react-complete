import MeetupList from '@/components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'First Mixer',
    image:
      'https://fastly.picsum.photos/id/152/300/300.jpg?hmac=dm_GPki-2zVGdmmOTDJdIQzItJi7zC0gbCSSw4N2Hxk',
    address: 'Some address'
  },
  {
    id: 'm2',
    title: 'Second Mixer',
    image:
      'https://fastly.picsum.photos/id/1040/300/300.jpg?hmac=7oB6fH5HfQ64Wjz7nJo0f2fP-8r4ytkgsg97_6KuMng',
    address: 'Some address 2'
  },
  {
    id: 'm3',
    title: 'Third Mixer',
    image:
      'https://fastly.picsum.photos/id/173/300/300.jpg?hmac=sLKRQqyhqQXIpv5NR6LBNdazxQow4wMJwl570A5uwO0',
    address: 'Some address 3'
  }
];

export default function HomePage({ meetups }) {
  return (
    <>
      <MeetupList meetups={meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
  };
}
