import { ErrorHandler } from "../../shared/config/domain/ErrorHandler";
import { User } from "../domain/User";
import { UserDocument } from "../domain/UserDocument";
import { UserEmail } from "../domain/UserEmail";
import { UserNameAndSurname } from "../domain/UserNameAndSurname";
import { UserRepository } from "../domain/UserRepository";
import { UpdaterUserRequest } from "./UserUpdaterRequest";

export class UserUpdater { 
  private readonly repository : UserRepository
  
  constructor(repository:UserRepository){
    this.repository = repository
  }

  async run(document:string,request:UpdaterUserRequest):Promise<void>{
    try {
      const user = new User({
        name      : new UserNameAndSurname(request.name,'Name'),
        surname   : new UserNameAndSurname(request.surname,'Surname'),
        document  : new UserDocument(document),
        email     : new UserEmail(request.email)
      })

      const documentValidation= await this.repository.findByDocument(user.document)
      if(!documentValidation) throw new ErrorHandler(404,40406,'User not found')
      const emailValidation = await this.repository.findByEmail(user.email)
      if(emailValidation) throw new ErrorHandler(400,40007,'Email already exist')
      await this.repository.updateUserByid(
        user.document,
        {
          name:user.name,
          surname:user.surname,
          email:user.email
        }
      )
    } catch (error) {
      throw error
    }
  }
}
