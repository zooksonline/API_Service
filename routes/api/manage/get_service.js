const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../../middleware/auth");

// Get all last list
router.post("/", (req, res) => {
  const allList = async () => {
    // DB Config
    const mongoose = require("mongoose");
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
        const List = require("../../../models/User");
        const { buasri_id } = req.body;
        List.aggregate([
          { $match: { buasri_id } },
          {
            $project: {
              buasri_id: "$buasri_id",
              firstname: "$firstname",
              lastname: "$lastname",
              dep: "$dep",
              e_research: "$service.e_research",
              e_qa: "$service.e_qa",
              e_scihuris: "$service.e_scihuris",
              e_budget: "$service.e_budget",
            },
          },
          {
            $unwind: { path: "$e_research", preserveNullAndEmptyArrays: true },
          },
          { $unwind: { path: "$e_qa", preserveNullAndEmptyArrays: true } },
          {
            $unwind: { path: "$e_scihuris", preserveNullAndEmptyArrays: true },
          },
          {
            $unwind: { path: "$e_budget", preserveNullAndEmptyArrays: true },
          },
          {
            $group: {
              _id: "_id",
              buasri_id: { $last: "$buasri_id" },
              firstname: { $last: "$firstname" },
              lastname: { $last: "$lastname" },
              dep: { $last: "$dep" },
              e_research: { $last: "$e_research" },
              e_qa: { $last: "$e_qa" },
              e_scihuris: { $last: "$e_scihuris" },
              e_budget: { $last: "$e_budget" },
            },
          },
        ])
          .then((Success) => res.json(Success))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  allList();
});

module.exports = router;
