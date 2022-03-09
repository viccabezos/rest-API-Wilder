import { body, validationResult } from "express-validator";

export const create = [
  body("name")
    .isLength({ min: 4 })
    .withMessage("Le nom doit avoir au moins 4 caractères"),
  body("city")
    .isLength({ min: 2 })
    .withMessage("La ville doit avoir au moins 2 caractères"),
  (req, res, next) => {
    const errorsValidation = validationResult(req);
    console.log("ERROR", errorsValidation);
    if (!errorsValidation.isEmpty()) {
      // je dois formater les erreurs pour coller au modele : {success: false, result: {name: "Le nom doit ..."}}
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
