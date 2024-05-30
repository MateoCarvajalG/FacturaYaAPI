import { ErrorHandler } from "../../shared/config/domain/ErrorHandler";
import { User } from "../domain/User";
import { UserDocument } from "../domain/UserDocument";
import { UserEmail } from "../domain/UserEmail";
import { UserNameAndSurname } from "../domain/UserNameAndSurname";
import { UserRepository } from "../domain/UserRepository";
import { CreatorUserRequest } from "./UserCreatorRequest";

export class UserCreator { 
  private readonly repository : UserRepository
  
  constructor(repository:UserRepository){
    this.repository = repository
  }

  async run(request:CreatorUserRequest):Promise<void>{
    try {
      const user = new User({
        name      : new UserNameAndSurname(request.name,'Name'),
        surname   : new UserNameAndSurname(request.surname,'Surname'),
        document  : new UserDocument(request.document),
        email     : new UserEmail(request.email)
      })

      const documentValidation= await this.repository.findByDocument(user.document)
      if(documentValidation) throw new ErrorHandler(400,40005,'User already exist')

      const emailValidation = await this.repository.findByEmail(user.email)
      if(emailValidation) throw new ErrorHandler(400,40006,'Email already exist')

      await this.repository.save(user)
      
    } catch (error) {
      throw error
    }
  }
}
