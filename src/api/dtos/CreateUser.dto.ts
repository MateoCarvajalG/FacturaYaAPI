import { body } from "express-validator"

export const UserCreatorSchema =[
    body('document','invalid document')
      .custom(value=>{
        if(!value) throw new Error('document is required')
        if(!/^(?=.{5,100}$)[A-Z\d-]+$/.test(value)) {
          throw new Error('The user document is not valid')
        }
        return true
      }),
    body('name','invalid name')
      .custom(value=>{
        if(!value) throw new Error('name is required')
        if(!/^[A-Z][A-ZÀ-ÿ \\u00f1 \\u00d1 \\s]{0,18}[A-Z]$/.test(value)) {
          throw new Error('The user name is not valid')
        }
        return true
      }),
    body('surname','invalid surname')
      .custom(value=>{
        if(!value) throw new Error('surname is required')
        if(!/^[A-Z][A-ZÀ-ÿ \\u00f1 \\u00d1 \\s]{0,18}[A-Z]$/.test(value)) {
          throw new Error(`The user surname is not valid`);
        }
        return true
      }),
    body('email')
      .custom(value=>{
        if(!value) throw new Error('email is required')
        if(value && value.length > 64) throw new Error('The email address provided exceeds the maximum allowed length of 64 characters.')

        if( value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
          throw new Error('The user email is not valid')
        }
        if( value && !/^[^@\s]+@(hotmail|gmail|yahoo|outlook|protonmail)\.(com|net)$/.test(value)){
          throw new Error('The domain of the email address provided is not valid.')
        }
        return true
      }),
  ]
