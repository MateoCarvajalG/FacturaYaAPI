import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';
import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class UserDocument extends StringValueObject {
    
  constructor(value: string) {
      super(value);
      this.ensureDocumentIsValid(value);
  }

  private ensureDocumentIsValid(value: string): void {
    if(!value) throw new ErrorHandler(400,40002,'The user document is required')
    if(!/^(?=.{5,15}$)[A-Z\d-]+$/.test(value)) {
      throw new ErrorHandler(400,40004,'The customer document is not valid')
    }
  }
}
