import res from "express/lib/response";
import WilderModel from "../models/Wilder";
import { listErrors } from "../utilities/tools";

const methods = {
  create: (req, res) => {
    const { name, city, skills } = req.body;

    WilderModel.init().then(() => {
      const wilder = new WilderModel({
        name,
        city,
        skills,
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

    WilderModel.findOne({ _id })
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
    WilderModel.find()
      .then((result) => {
        res.json({ success: true, result });
      })
      .catch((err) => {
        res.json({ success: false, result: listErrors(err) });
      });
  },

  deleteOne: (req, res, next) => {
    const { _id } = req.body;
    WilderModel.deleteOne({ _id })
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
        res.json({ success: false, result: listErrors(err) });
      });
  },
  update: (req, res) => {
    const { _id, name, city, skills } = req.body;
    console.log(req.body);
    WilderModel.updateOne({ _id }, { name, city, skills })
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
        res.json({ success: false, result: listErrors(err) });
      });
  },
};

export default methods;
