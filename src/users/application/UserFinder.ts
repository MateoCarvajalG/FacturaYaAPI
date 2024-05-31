import { ErrorHandler } from "../../shared/config/domain/ErrorHandler";
import { UserDocument } from "../domain/UserDocument";
import { UserObject, UserRepository } from "../domain/UserRepository";

export class UserFinder{
  private readonly repository : UserRepository;

  constructor(repository:UserRepository){
    this.repository = repository
  }

  async run(userId:string):Promise<UserObject> {
    const user = await this.repository.findByDocument(new UserDocument(userId));
    if(!user) throw new ErrorHandler(404,40406,'User not found')

    return user
  }
}
