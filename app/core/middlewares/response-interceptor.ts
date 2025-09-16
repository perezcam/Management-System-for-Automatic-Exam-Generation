import { NextFunction } from "connect"
import { Request, Response } from "express"
import { httpLogger  } from "../logging/httpLogger";
import { formatHttpLoggerResponse } from "../helpers/logging_helpers/formatHttpLoggerRespond";



const responseInterceptor = (
    req : Request,
    res : Response,
    next : NextFunction
) => {

    const requestStartTime = Date.now();
    const originalSend = res.send;

    let responseSent = false;

    res.send = function (body : any) : Response { 

        if (!responseSent) {
            if (res.statusCode < 400) {
                httpLogger.info("Request processed successfully", formatHttpLoggerResponse(req, res, body, requestStartTime));
            } else {
                httpLogger.error(body.message, formatHttpLoggerResponse(req, res, body, requestStartTime));
            }
            responseSent = true;
        }; 

        return originalSend.call(this, body)
    };  

    next();
};


export { responseInterceptor }



//TODO: Crear middlewares de autenticacion, autorizacion, manejo de errores, 
// Middleware de validacion de requests (con Joi y schemas) IMPORTANTEEE