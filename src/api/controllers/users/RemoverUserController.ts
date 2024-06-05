import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { UserRemover } from "../../../users/application/UserRemover";
import container from "../../dependency-injection"
import { Controller } from "../../types";

export class RemoverUserController implements Controller{
  constructor(private userRemover: UserRemover){
    this.userRemover= container.get('users.application.UserRemover')
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { document } = req.params
      await this.userRemover.run(document)
      res.status(httpStatus.OK).json({"msg":'user succesfully removed'})
    } catch (error) {
      return next(error)
    }
  }
}
