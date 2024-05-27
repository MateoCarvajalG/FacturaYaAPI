import { createLogger, format, transports } from 'winston';
import appConfig from '../../shared/infrastructure/config';


const { timestamp, combine, json } = format;

export const logger = createLogger({
  transports: [
    new transports.File({
      level: 'debug',
      maxsize: 10240000,
      maxFiles: 5,
      filename: `${appConfig.get('mongoose.connection_string')}/debug.log`,
      format: combine(
        timestamp(),
        json()
      )
    }),
    new transports.Console({
      level: 'debug',
      format: combine(
        timestamp(),
        json()
      )
    })
  ]
})

