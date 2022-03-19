"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wilder_1 = __importDefault(require("../controllers/wilder"));
const validations_1 = require("../validations");
const router = express_1.default.Router();
router.post("/create", validations_1.wilderValidation.create, wilder_1.default.create);
router.get("/all", wilder_1.default.getAll);
router.delete("/delete", wilder_1.default.deleteOne);
router.put("/update", wilder_1.default.update);
router.get("/find/:_id", wilder_1.default.findOne);
exports.default = router;
