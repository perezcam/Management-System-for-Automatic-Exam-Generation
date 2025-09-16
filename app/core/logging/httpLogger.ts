import winston from 'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';
import timestampFormat from '../helpers/logging_helpers/timeStampFormat';


const { combine, timestamp, json, printf } = winston.format;


const httpLogger = winston.createLogger({
    format: combine(
        timestamp({format: timestampFormat}),
        json(),
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
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/http/%DATE%.log', 
            datePattern: 'MMMM-DD-YYYY',
            zippedArchive: false, //TODO: Quizá cambiar a true después
            maxSize: '20m', 
            maxFiles: '7d' 
        })
    ],
});


export { httpLogger };