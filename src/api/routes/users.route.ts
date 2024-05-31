import { NextFunction, Request, Response,  Router } from 'express';
import { validatorHandler } from '../middlewares';
import { CreatorUserController } from '../controllers'
import container from '../dependency-injection/index';
import appConfig from '../../shared/infrastructure/config';
import { FindUserSchema, UserCreatorSchema } from '../dtos';
import { FinderUserController } from '../controllers/users/FinderUserController';



export const register = (router: Router) => {
  const UserCreatorController : CreatorUserController = container.get('api.controller.CreateUsersController')
  router.post(
    `${appConfig.get('api.prefix')}/users`,
    UserCreatorSchema,
    validatorHandler,
    (req: Request, res: Response, next: NextFunction) => UserCreatorController.run(req, res, next)
  )

  const UserFinderController : FinderUserController = container.get('api.controller.FinderUserController')
  router.get(
    `${appConfig.get('api.prefix')}/users`,
    FindUserSchema,
    validatorHandler,
    (req: Request, res: Response, next: NextFunction) => UserFinderController.run(req, res, next)
  )

  const UsersFinderController : FinderUserController = container.get('api.controller.FinderUsersController')
  router.get(
    `${appConfig.get('api.prefix')}/users/all`,
    (req: Request, res: Response, next: NextFunction) => UsersFinderController.run(req, res, next)
  )

}
