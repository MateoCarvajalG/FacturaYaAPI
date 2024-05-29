import { User } from "../domain/User";
import { UserObject, UserRepository } from "../domain/UserRepository";
import { Schema, Connection,connections,Error,Model } from 'mongoose';
import appConfig from "../../shared/infrastructure/config";
import { UserDocument } from "../domain/UserDocument";
import { Nullable } from "../../shared/config/domain/value-object/Nullable";
import { UserEmail } from "../domain/UserEmail";

export const userSchema= new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  }
}, {
  collection: 'users',
  versionKey: false
})

interface IUser{
  name    : string,
  email   : string,
  surname : string,
  document: string,
}


export class MongoUserRepository implements UserRepository{
  private dbName: string = appConfig.get('mongoose.db_name');
  private db: (Connection | undefined) = connections.find((conn) => {
    return conn.name === this.dbName;
  })
  private model: (Model<IUser> | null) = this.db === undefined ? null : this.db.model<IUser>('user', userSchema);
  
  public async findByDocument(document: UserDocument): Promise<Nullable<UserObject>> {
    this.createModel()
    if(this.model){
      return this.model.findOne({document:document}).lean()
    }
    return null 
  }

  public async findByEmail(email: UserEmail): Promise<Nullable<UserObject>> {
    this.createModel()
    if(this.model){
      return this.model.findOne({email:email}).lean()
    }
    return null 
 
  }

  
  public async save(user:User):Promise<void>{
    this.createModel()
    if(this.model){
      this.model.create(user)
      return 
    }
    return
  }


  private createModel() {
    this.validateConnection();
    if(!this.model) {
      this.model = this.db === undefined ? null : this.db.model<IUser>('role', userSchema);
    }
    if(!this.model) {
      throw new Error('Database not connected');
    }
  }

  private validateConnection() {
    if(!this.db) {
      this.db = connections.find((conn) => {
        return conn.name === this.dbName;
      })
    }
  }
} 
