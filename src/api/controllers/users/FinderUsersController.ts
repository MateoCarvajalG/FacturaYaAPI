import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { UsersFinder } from "../../../users/application/UsersFinder";
import container from "../../dependency-injection";
import { Controller } from "../../types";


export class FinderUsersController implements Controller{
  constructor(private userFinder: UsersFinder){
    this.userFinder= container.get('users.application.UsersFinder')
  }

  async run(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userFinder.run()
      res.status(httpStatus.FOUND).json(users)
    } catch (error) {
      return next(error)
    }
  }
}
