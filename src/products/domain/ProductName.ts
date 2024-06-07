import { ErrorHandler } from '../../shared/config/domain/ErrorHandler';
import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class ProductName extends StringValueObject {
    constructor(value: string ) {
        super(value);
        this.ensureValueIsValid(value);
    }
    
  private ensureValueIsValid(value: string): void {
    if(!value) throw new ErrorHandler(400,40007,`The product name is required`)
    if(!/^[A-Za-z][A-Za-zÀ-ÿ \\u00f1 \\u00d1 \\s]{0,18}[A-Za-z]$/.test(value)) {
      throw new ErrorHandler(400,40008,`The  product name is not valid`);
    }
  }
}
