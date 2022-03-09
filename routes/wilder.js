import express from "express";
import wilderController from "../controllers/wilder";
import { wilderValidation } from "../validations";

const router = express.Router();

router.post("/create", wilderValidation.create, wilderController.create);

router.get("/all", wilderController.getAll);

router.delete("/delete", wilderController.deleteOne);
router.put("/update", wilderController.update);
router.get("/find/:_id", wilderController.findOne);

export default router;
