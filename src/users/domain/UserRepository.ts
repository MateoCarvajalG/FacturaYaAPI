import { Nullable } from "../../shared/config/domain/value-object/Nullable";
import { User } from "./User";
import { UserDocument } from "./UserDocument";
import { UserEmail } from "./UserEmail";

export interface UserObject{
  name      : string,
  email     : string,
  surname   : string,
  document  : string,
}


export interface UserRepository{
  findByDocument(document:UserDocument):Promise<Nullable<UserObject>>
  findByEmail(email:UserEmail):Promise<Nullable<UserObject>>
  findAll():Promise<Nullable<UserObject[]>>
  save(user:User):Promise<void>
}
