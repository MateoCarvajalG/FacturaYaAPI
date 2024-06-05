import { param } from "express-validator";

export const FindUserSchema = [
  param('document','Invalid document')
    .exists()
    .matches(/^(?=.{5,100}$)[A-Z\d-]+$/),
]
