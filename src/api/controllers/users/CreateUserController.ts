import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { UserCreator } from "../../../users/application/UserCreator";
import container from "../../dependency-injection";
import { Controller } from "../../types";

type UserCreatorRequest = Request & {
  body:{
    name:string,
    surname:string,
    document:string,
    email:string,
  }
}

export class CreatorUserController implements Controller{
  constructor(private userCreator : UserCreator){
    console.log('creator user controller',userCreator)
    this.userCreator = container.get('users.application.UserCreator')
  }

  async run(req: UserCreatorRequest, res: Response, next: NextFunction): Promise<void> {
    console.log('controller')
    try {
      const {name,surname,email,document} = req.body
      await this.userCreator.run({name,surname,email,document})
      res.status(httpStatus.CREATED).json({"msg":'user succesfully created'})
    } catch (error) {
      next(error)
    }
  }
}
