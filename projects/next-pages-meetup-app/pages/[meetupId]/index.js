import Head from 'next/head';

import MeetupDetails from '@/components/meetups/MeetupDetails';
import { getDb } from '@/lib/db';

export default function MeetupDetailsPage({ details }) {
  return (
    <>
      <Head>
        <title>{details.title}</title>
        <meta name='description' content={details.description} />
      </Head>
      <MeetupDetails {...details} />
    </>
  );
}

export async function getStaticPaths() {
  const { collection, closeClient } = await getDb('meetups');

  const documents = await collection.find().project({ _id: 1 }).toArray();
  const ids = documents.map((item) => item._id.toString());

  const paths = ids.map((id) => ({ params: { meetupId: id } }));

  closeClient();

  return { fallback: false, paths };
}

export async function getStaticProps(context) {
  const { collection, closeClient, ObjectId } = await getDb('meetups');
  const { meetupId } = context.params;

  const document = await collection.findOne({ _id: new ObjectId(meetupId) });

  const { _id, title, image, address, description } = document;

  closeClient();

  return {
    props: {
      details: { id: _id.toString(), title, image, address, description }
    }
  };
}
