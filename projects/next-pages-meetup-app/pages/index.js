import Head from 'next/head';

import MeetupList from '@/components/meetups/MeetupList';
import { getDb } from '@/lib/db';

export default function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>NextJS Meetups</title>
        <meta name='description' content='Tech meetups.' />
      </Head>
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
  const { collection, closeClient } = await getDb('meetups');

  const documents = await collection.find().toArray();

  let meetups = [];

  if (documents?.length) {
    meetups = documents.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      image: item.image,
      address: item.address,
      description: item.description
    }));
  }

  closeClient();

  return {
    props: {
      meetups
    },
    revalidate: 60
  };
}
