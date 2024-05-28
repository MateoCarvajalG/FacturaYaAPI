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
    console.log('userCreator', repository)
  }

  async run(request:CreatorUserRequest):Promise<void>{
    const user = new User({
      name      : new UserNameAndSurname(request.name,'Name'),
      surname   : new UserNameAndSurname(request.surname,'Surname'),
      document  : new UserDocument(request.document),
      email     : new UserEmail(request.email)
    })

    try {
      // Validaciones antes de insertar a base de datos
      await this.repository.save(user)
      
    } catch (error) {
      throw error
    }
  }
}
