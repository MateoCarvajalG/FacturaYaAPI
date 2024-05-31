import { query } from "express-validator";

export const FindUserSchema = [
  query('document','Invalid document')
    .exists()
    .matches(/^(?=.{5,100}$)[A-Z\d-]+$/),
]
