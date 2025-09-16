import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import timestampFormat from "../helpers/logging_helpers/timeStampFormat";

const { combine, timestamp, json } = winston.format



const auditLogger = winston.createLogger({
    format: combine(
        timestamp({ format: timestampFormat }),
        json()
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/audit/-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '7d',
        })
    ]
});


export { auditLogger }