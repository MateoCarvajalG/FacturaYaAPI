import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { UserUpdater } from "../../../users/application/UserUpdater";
import container from "../../dependency-injection"
import { Controller } from "../../types";

type UserUpdaterRequest = Request & {
  body:{
    name:string,
    surname:string,
    document:string,
    email:string,
  }
}

export class UpdaterUserController implements Controller{
  constructor(private userUpdater: UserUpdater){
    this.userUpdater = container.get('users.application.UserUpdater')
  }

  async run(req: UserUpdaterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const {name,surname,email} = req.body
      const { document } = req.params
      await this.userUpdater.run(document,{name,surname,email})
      res.status(httpStatus.CREATED).json({"msg":'user succesfully updated'})
    } catch (error) {
      return next(error)
    }
  }
}
