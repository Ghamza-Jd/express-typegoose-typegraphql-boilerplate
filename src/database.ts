import mongoose from 'mongoose';
import config from './config';

export default class Database {
  static connect = () => {
    mongoose
      .connect(config.mongo.localUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Mongodb connected...');
      });
  };
}
