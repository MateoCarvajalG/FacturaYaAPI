import { ProductCode } from "./ProductCode";
import { ProductDescription } from "./ProductDescription";
import { ProductName } from "./ProductName";
import { ProductTax } from "./ProductTax";

interface ProductInterface{
  name        : ProductName,
  description : ProductDescription,
  tax         : ProductTax,
  code        : ProductCode,
  category    : string
}

interface ProductPlainDataInterface{
  name        : string,
  description : string,
  tax         : string,
  code        : string,
  category    : string,
}

export class Product{ 
  readonly name         : ProductName;
  readonly description  : ProductDescription;
  readonly tax          : ProductTax;
  readonly code         : ProductCode;
  readonly category     : string
  
  constructor({name,description,tax,code,category}:ProductInterface){
    this.name         = name ;
    this.description  = description;
    this.tax          = tax;
    this.code         = code;
    this.category     = category;
  }

  static fromPrimitives(plainData:ProductPlainDataInterface):Product{
    return new Product({
      name        : new ProductName(plainData.name),
      description : new ProductDescription(plainData.description),
      tax         : new ProductTax(plainData.tax),
      code        : new ProductCode(plainData.code),
      category    : plainData.category
    })
  }

  static toPrimitives(product:Product):ProductPlainDataInterface{
    return {
      name        : product.name.value,
      description : product.description.value,
      tax         : product.tax.value,
      code        : product.code.value,
      category    : product.category
    }
  }

}
