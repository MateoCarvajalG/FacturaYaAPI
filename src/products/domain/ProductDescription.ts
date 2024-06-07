import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';
import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class ProductDescription extends StringValueObject {
    
  constructor(value: string) {
      super(value);
      this.ensureIsADescriptionValid(value);
  }

  private ensureIsADescriptionValid(value: string): void {
    if(!value) throw new ErrorHandler(400,40009,`The description is required`)
    if( !/^[\s\S]{1,2000}$/.test(value)) throw new ErrorHandler(400,40010,`The description is wrong`)  
  }
}
