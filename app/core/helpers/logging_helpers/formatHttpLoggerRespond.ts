import { Request, Response } from "express";
import { excludeSensitiveInfoInData  } from "./sensitiveInfoExcluder";


const formatHttpLoggerResponse = (
    req : Request,
    res : Response,
    responseBody : any, //TODO: Aqui se deberia cambiar a schema base o algo asi 
    requestStartTime : number,
) => {

    const requestDuration = Date.now() - requestStartTime;
    const requestDurationInSeconds = `${requestDuration / 1000}s`; // ms to s

    return {
        request: {
            headers: req.headers,
            host: req.headers.host,
            baseUrl : req.baseUrl, 
            url : req.url,
            method : req.method,
            body : req.body,
            params: req?.params,
            query: req?.query,
        },
        response: {
            headers: res.getHeaders(),
            statusCode: res.statusCode,
            requestDurationInSeconds, 
            body: excludeSensitiveInfoInData(responseBody),
        }
    }
}


export { formatHttpLoggerResponse };