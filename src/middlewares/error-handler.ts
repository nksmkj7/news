import { Request, Response, NextFunction } from 'express';
import { ErrorException } from './../error-handler/error-exception';
import logger from '../services/logger.service';

interface ErrorWithAxios extends Error { 
    isAxiosError: boolean,
    [index:string]: any
}

export const errorHandler = (err: ErrorWithAxios, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let errorMessage= "Something went wrong."
    if (err?.isAxiosError) {
        statusCode = err.response.status;
        errorMessage = err.response.data.message
    }
    else if (err instanceof ErrorException) {
        statusCode = err.status;
        errorMessage = err.message
    }
    
    logger.error(errorMessage,{
                        service: "E2E Auth",
                        config: err
                    })
    return res.status(statusCode).send({
        statusCode,
        errorMessage
    });
};