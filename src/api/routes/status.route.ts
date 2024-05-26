import { Router, Request, Response, NextFunction } from 'express';

import { StatusGetController } from '../controllers';
import appConfig from '../../shared/infrastructure/config';

export const register = (router: Router) => {
  //TODO: add dependency injection
  const controller: StatusGetController = new StatusGetController();
  router.get(`${appConfig.get('api.prefix')}/status`, (req: Request, res: Response, next: NextFunction) => controller.run(req, res, next));
};
