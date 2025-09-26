import { NextFunction } from "connect"
import { Request, Response } from "express"
import { formatHttpLoggerResponse } from "../logging/helpers/formatHttpLoggerRespond";
import { SystemLogger } from "../logging/logger";
import { get_logger } from "../dependencies/dependencies";


const responseInterceptor = (
    req : Request,
    res : Response,
    next : NextFunction,
) => {

    const logger : SystemLogger = get_logger()
    
    const requestStartTime = Date.now();
    const originalSend = res.send;

    let responseSent = false;

    res.send = function (body : any) : Response { 

        if (!responseSent) {
            if (res.statusCode < 400) {
                logger.httpLogger.info("Request processed successfully", formatHttpLoggerResponse(req, res, body, requestStartTime));
            } else {
                logger.httpLogger.error(body.message, formatHttpLoggerResponse(req, res, body, requestStartTime));
            }
            responseSent = true;
        }; 
        console.log('Esto es desde el response interceptor', 'body'); 
        return originalSend.call(this, body)
    };  

    next();
};


export { responseInterceptor }



//TODO: Crear middlewares de autenticacion, autorizacion
