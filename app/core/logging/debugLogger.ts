import winston  from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import timestampFormat from "../helpers/logging_helpers/timeStampFormat";

const { combine, timestamp, printf } = winston.format

const debugLogger = winston.createLogger({
    level: 'debug', 
    format: combine(
        timestamp({ format: timestampFormat }),
        printf(({ timestamp, level, message, ...data }) => {
            const response = {
                level, 
                message, 
                data,
            };

            return JSON.stringify(response, null, 4);
        })
    ),
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        new DailyRotateFile({
            filename: 'logs/debug/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '7d',
        })
    ]
});


export { debugLogger }