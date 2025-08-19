const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB_NAME } = process.env;

const MONGODB_CONNECTION_STRING = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@meetup-data.hikknkz.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=meetup-data`;

export {
  MONGODB_DB_NAME,
  MONGODB_PASSWORD,
  MONGODB_USER,
  MONGODB_CONNECTION_STRING
};
