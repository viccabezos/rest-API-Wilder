import { body, ValidationError, validationResult } from "express-validator";
import { Request, Response } from "express";

export const create = [
  body("name")
    .isLength({ min: 4 })
    .withMessage("Le nom doit avoir au moins 4 caractères"),
  body("city")
    .isLength({ min: 2 })
    .withMessage("La ville doit avoir au moins 2 caractères"),
  (req: Request, res: Response, next) => {
    const errorsValidation: any = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      let errors = {};

      errorsValidation.errors.map((err) => {
        errors = { ...errors, [err.param]: err.msg };
      });

      return res.json({
        success: false,
        result: errors,
      });
    }
    next();
  },
];
