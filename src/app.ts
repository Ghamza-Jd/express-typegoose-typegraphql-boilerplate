import server from './server';
import database from './database';

server().then((app) => {
  database.connect();
  app.listen(3001, () => console.log('Server started at http://localhost:3001/graphql'));
});
