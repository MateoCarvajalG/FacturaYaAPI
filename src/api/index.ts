import appConfig from '../shared/infrastructure/config';
import { mongooseLoader } from '../shared/infrastructure/persistence/dbConfig';

import { Server } from './models';

try {
  mongooseLoader(appConfig.get('mongoose.connection_string'),appConfig.get('mongoose.db_name'))
  new Server().listen();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});
