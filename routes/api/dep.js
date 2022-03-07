const express = require("express");
const router = express.Router();
const config = require("config");
const mongoose = require("mongoose");

// add (/add)
router.post("/add", (req, res) => {
  const depAdd = async () => {
    // DB Config
    const db = config.get("mongoUsers");
    const option = config.get("option");
    // Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const Department = require("../../models/Department");
        const { currentNameTH, currentNameEN } = req.body;
        // console.log(currentNameTH);
        const newDep = new Department({
          currentNameTH,
          currentNameEN,
          history: [
            {
              nameTH: currentNameTH,
              nameEN: currentNameEN,
              startDate: new Date(),
              endDate: null,
            },
          ],
        });
        newDep
          .save()
          .then((department) => {
            return res.send({ department, message: "Successed Add!" });
          })
          .catch((err) => {
            console.log(err);
            return res.send({ err });
          });
      })
      .catch((err) => console.log(err));
  };
  depAdd();
});

// list (/)
router.get("/", (req, res) => {
  const depList = async () => {
    // DB Config
    const db = config.get("mongoUsers");
    const option = config.get("option");
    // Connect Mongo
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Department Model
        const Department = require("../../models/Department");
        Department.find({ isDeleted: false }, [
          "currentNameTH",
          "currentNameEN",
        ]).then((departments) => res.json(departments));
      })
      .catch((err) => console.log(err));
  };
  depList();
});

module.exports = router;
