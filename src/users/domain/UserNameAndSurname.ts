import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';
import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

type Type = "Name" | "Surname"

export class UserNameAndSurname extends StringValueObject {
    constructor(value: string, type:Type) {
        super(value);
        this.ensureValueIsValid(value,type);
    }
    
  private ensureValueIsValid(value: string,type:string): void {
    if(!value) throw new ErrorHandler(400,40001,`The user ${type} is required`)
    if(!/^[A-Z][A-ZÀ-ÿ \\u00f1 \\u00d1 \\s]{0,18}[A-Z]$/.test(value)) {
      throw new ErrorHandler(400,40005,`The ${type} <${value}> is not valid`);
    }
  }
}
