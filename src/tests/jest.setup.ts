import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { userModel } from '../modules/user/User';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Database connection', () => {
  it('Checking if user documents are 0', async () => {
    const count = await userModel.countDocuments();
    expect(count).toEqual(0);
  });
});
