import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';
import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class ProductTax extends StringValueObject {
    
  constructor(value: string) {
      super(value);
      this.ensureIsATaxValid(value);
  }

  private ensureIsATaxValid(value: string): void {
    if(!value) throw new ErrorHandler(400,40011,`The tax is required`)
    if( !/^\d+(\.\d{1,2})?$/.test(value)) throw new ErrorHandler(400,40012,`The tax is wrong`)  
  }
}
