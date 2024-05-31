import { ErrorHandler } from "../../shared/config/domain/ErrorHandler";
import { UserObject, UserRepository } from "../domain/UserRepository";

export class UsersFinder{
  private readonly repository : UserRepository;

  constructor(repository:UserRepository){
    this.repository = repository
  }

  async run():Promise<UserObject[]> {
    const user = await this.repository.findAll();
    if(!user) throw new ErrorHandler(404,40406,'User not found')

    return user
  }
}
