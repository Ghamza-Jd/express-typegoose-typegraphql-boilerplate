import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) throw new Error('Could not find .env file');

export default {
  port: process.env.PORT,
  mongo: {
    localUrl: String(process.env.MONGO_LOCAL_URL),
    atlasUrl: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
  },
};
