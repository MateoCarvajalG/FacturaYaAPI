import { User } from "./User";

export interface UserObject{
  name      : string,
  email     : string,
  surname   : string,
  document  : string,
}


export interface UserRepository{
  save(user:User):Promise<void>
}
