import { NextFunction, Request, Response,  Router } from 'express';
import { validatorHandler } from '../middlewares';
import { CreatorUserController } from '../controllers'
import container from '../dependency-injection/index';
import appConfig from '../../shared/infrastructure/config';
import { UserCreatorSchema } from '../dtos';



export const register = (router: Router) => {
  const UserCreatorController : CreatorUserController = container.get('api.controller.CreateUsersController')
  router.post(
    `${appConfig.get('api.prefix')}/users`,
    UserCreatorSchema,
    validatorHandler,
    (req: Request, res: Response, next: NextFunction) => UserCreatorController.run(req, res, next)
  )
}
