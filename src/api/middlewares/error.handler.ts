import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if(err instanceof ErrorHandler) {
      return res
        .status(err.statusCode)
        .json({error: {
          code: err.code,
          message: err.message
        }})
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({error: {
        code: 50000,
        message: 'Internal server error'
      }}
    )
}
