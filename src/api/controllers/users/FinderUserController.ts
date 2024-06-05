import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { UserFinder } from "../../../users/application/UserFinder";
import container from "../../dependency-injection";
import { Controller } from "../../types";


export class FinderUserController implements Controller{
  constructor(private userFinder: UserFinder){
    this.userFinder= container.get('users.application.UserFinder')
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { 
      const { document } = req.params
      const user = await this.userFinder.run(<string>document)
      res.status(httpStatus.FOUND).json(user)
    } catch (error) {
      return next(error)
    }
  }
}
