"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wilder_1 = __importDefault(require("../models/Wilder"));
const tools_1 = require("../utilities/tools");
const methods = {
    create: async (req, res) => {
        const { name, city, skills, description } = req.body;
        Wilder_1.default.init().then(() => {
            const wilder = new Wilder_1.default({
                name: String,
                city: String,
                skills,
                description: String,
            });
            wilder
                .save()
                .then((result) => {
                console.log("success creating wilder", result);
                res.json({ success: true, result: result });
            })
                .catch((err) => {
                console.log("error saving wilder", err);
                res.json({ success: false, result: err });
            });
        });
    },
    findOne: (req, res) => {
        const { _id } = req.params;
        Wilder_1.default.findOne({ _id })
            .then((result) => {
            if (!result) {
                return res.json({
                    success: false,
                    result: "cet id does not exist",
                });
            }
            res.json({ success: true, result });
            console.log(result);
        })
            .catch((err) => {
            res.status(400).json({
                success: false,
                result: err,
            });
        });
    },
    getAll: (req, res) => {
        Wilder_1.default.find()
            .then((result) => {
            res.json({ success: true, result });
        })
            .catch((err) => {
            res.json({ success: false, result: (0, tools_1.listErrors)(err) });
        });
    },
    deleteOne: (req, res, next) => {
        const { _id } = req.body;
        Wilder_1.default.deleteOne({ _id })
            .then((result) => {
            if (result.deletedCount === 0) {
                return res.json({
                    success: false,
                    result: "Cet identifiant n'existe pas",
                });
            }
            res.json({
                success: true,
                result,
            });
        })
            .catch((err) => {
            res.json({ success: false, result: (0, tools_1.listErrors)(err) });
        });
    },
    update: (req, res) => {
        const { _id, name, city, skills } = req.body;
        console.log(req.body);
        Wilder_1.default.updateOne({ _id }, { name, city, skills })
            .then((result) => {
            console.log("SUCCES update", result);
            if (result.matchedCount === 0) {
                return res.json({
                    success: false,
                    result: "cet id does not exist for update failed",
                });
            }
            res.json({ success: true, result });
        })
            .catch((err) => {
            console.log("FAILED update", err);
            res.json({ success: false, result: (0, tools_1.listErrors)(err) });
        });
    },
};
exports.default = methods;
