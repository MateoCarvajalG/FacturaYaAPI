import convict from 'convict';
import dotenv from 'dotenv';
dotenv.config();

const appConfig = convict({
  api: {
    prefix: {
      doc: 'The file path',
      format: String,
      default: '/api/v1',
      env: 'API_PREFIX'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4500,
    env: 'PORT',
    arg: 'port'
  },
  logs: {
    file: {
      doc: 'The file path',
      format: String,
      default: `${ __dirname }/../../logs/debug.log`,
      env: 'LOG_FILE'
    },
  },
  mongoose:{
    connection_string:{
      doc:'connection uri to mongo',
      format:String,
      default:'hola',
      env:'APP_MONGO_URI'
    },
    db_name:{
      doc:'Database name',
      format:String,
      default:'test',
      env:'DB_NAME_APP'
    }
  }
});

appConfig.loadFile([__dirname + '/default.json', `${__dirname}/${appConfig.get('env')}.json`]);

export default appConfig;
