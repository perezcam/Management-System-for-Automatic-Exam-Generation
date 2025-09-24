import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import timestampFormat from '../helpers/logging_helpers/timeStampFormat';


const { combine, timestamp, json, printf , errors} = winston.format;

const errorLogger = winston.createLogger({
  level: "error", 
  format: combine(
    timestamp({ format: timestampFormat }),
    errors({ stack: true }), // include stacktrace
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new DailyRotateFile({
        filename: 'logs/errors/%DATE%.log', 
        datePattern: 'MMMM-DD-YYYY',
        zippedArchive: true, 
        maxSize: '20m', 
        maxFiles: '7d' 
    }),
  ],
});

export { errorLogger }

