import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';
import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class UserEmail extends StringValueObject {
    
  constructor(value: string) {
      super(value);
      this.ensureIsAEmailValid(value);
  }

  private ensureIsAEmailValid(value: string): void {
    if( !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){ 
      throw new ErrorHandler(400,40008,`The customer email is wrong`)  
    }
  }
}
