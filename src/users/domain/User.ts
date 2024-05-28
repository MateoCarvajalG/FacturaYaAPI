import { UserDocument } from "./UserDocument";
import { UserEmail } from "./UserEmail";
import { UserNameAndSurname } from "./UserNameAndSurname";

interface UserInterface{
  name    : UserNameAndSurname,
  email   : UserEmail,
  surname : UserNameAndSurname,
  document: UserDocument,
}

interface UserPlainDataInterface{
  name    : string,
  email   : string,
  surname : string,
  document: string,
}

export class User { 
  readonly name     : UserNameAndSurname;
  readonly surname  : UserNameAndSurname;
  readonly document : UserDocument;
  readonly email    : UserEmail;
  
  constructor({name,surname,document,email}:UserInterface){
    this.name = name ;
    this.surname = surname ;
    this.document = document ;
    this.email = email
  }

  static fromPrimitives(plainData:UserPlainDataInterface):User{
    return new User({
      name: new UserNameAndSurname(plainData.name,'Name'),
      surname: new UserNameAndSurname(plainData.surname,'Surname'),
      document: new UserDocument(plainData.document),
      email: new UserEmail(plainData.email)
    })
  }

  static toPrimitives(user:User):UserPlainDataInterface{
    return {
      name: user.name.value,
      surname: user.surname.value,
      document: user.document.value,
      email: user.email.value
    }
  }

}
