import { ErrorHandler } from "../../shared/config/domain/ErrorHandler";
import { UserDocument } from "../domain/UserDocument";
import { UserObject, UserRepository } from "../domain/UserRepository";

export class UserRemover{
  private readonly repository : UserRepository;

  constructor(repository:UserRepository){
    this.repository = repository
  }

  async run(document:string):Promise<UserObject> {
    const id = new UserDocument(document)
    const user = await this.repository.findByDocument(id);
    if(!user) throw new ErrorHandler(404,40406,'User not found')
    
    await this.repository.removerUserByDocument(id)
    return user
  }
}
