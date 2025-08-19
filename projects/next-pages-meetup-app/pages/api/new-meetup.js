import { getDb } from '@/lib/db';

async function handler(req, res) {
  const { method } = req;
  if (method === 'POST') {
    const data = req.body;

    const { collection, closeClient } = await getDb('meetups');

    const result = await collection.insertOne(data);

    console.log('🚀 ~ new-meetup.js:18 ~ handler ~ result:', result);

    closeClient();

    res.status(201).json({ message: 'Meetup saved.' });
  }
}

export default handler;
