import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';
import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class ProductCode extends StringValueObject {
    
  constructor(value: string) {
      super(value);
      this.ensureIsACodeValid(value);
  }

  private ensureIsACodeValid(value: string): void {
    if(!value) throw new ErrorHandler(400,40013,`The product code is required`)
    if( !/^\d+(\.\d{1,2})?$/.test(value)) throw new ErrorHandler(400,40014,`The product code is wrong`)  
  }
}
