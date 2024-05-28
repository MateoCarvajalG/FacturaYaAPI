import httpStatus from 'http-status';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const  validatorHandler = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);
  if(validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors.array().map((err) => (
    {
      [err.param]: err.msg
    }));
  return res.status(httpStatus.BAD_REQUEST)
    .json({
      errors: errors.reduce((errorObject, currentError) => {
        const key = Object.keys(currentError)[0];
        const value = currentError[key]
        return { ...errorObject, [key]: value }
      }, {})
  })
}
