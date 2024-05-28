import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class MongoUserRepository implements UserRepository{
  
  public async save(user:User):Promise<void>{
    console.log('consulta a base de datos',user)
  }
} 
