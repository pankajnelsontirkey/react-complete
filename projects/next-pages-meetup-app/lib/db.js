import { MongoClient, ObjectId } from 'mongodb';

import { MONGODB_CONNECTION_STRING } from './constants';

export const getDb = async (collectionName) => {
  const client = await MongoClient.connect(MONGODB_CONNECTION_STRING);
  const db = client.db();
  const collection = db.collection(collectionName);

  const closeClient = () => {
    client.close();
  };

  return { client, db, collection, closeClient, ObjectId };
};
