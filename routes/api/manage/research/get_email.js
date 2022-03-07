const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../../../middleware/auth");

// รับ email ของ committee ตามภาควิชา
router.post("/committee", (req, res) => {
  // console.log(req.body);
  const getCommittee = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const dataMain = config.get("mongoUsers");
    const option = config.get("option");
    // Connect MongoDB
    await mongoose
      .connect(dataMain, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Main User Model
        const MainUser = require("../../../../models/User");
        const { dep } = req.body;
        mongoose.set("useFindAndModify", false);
        MainUser.aggregate([
          { $match: { dep } },
          {
            $project: {
              email: 1,
              dep: 1,
              "service.e_research._id": 1,
              "service.e_research.active": 1,
              "service.e_research.position": 1,
              "service.e_research.createdAt": 1,
            },
          },
          { $sort: { "service.e_research.createdAt": -1 } },
          { $unwind: "$service.e_research" },
          {
            $group: {
              _id: "$email",
              email: { $last: "$email" },
              dep: { $last: "$dep" },
              active: { $last: "$service.e_research.active" },
              position: { $last: "$service.e_research.position" },
              created: { $last: "$service.e_research.createdAt" },
            },
          },
          { $match: { active: "ACTIVE" } },
          { $match: { position: "COMMITTEE" } },
        ])
          .then((committee_email) => res.json(committee_email))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  getCommittee();
});

// รับ email ของ admin
router.post("/admin", auth, (req, res) => {
  console.log(req.body);
  const getAdmin = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const dataMain = config.get("mongoUsers");
    const option = config.get("option");

    // Connect MongoDB
    await mongoose
      .connect(dataMain, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        // Main User Model
        const MainUser = require("../../../../models/User");
        mongoose.set("useFindAndModify", false);
        MainUser.aggregate([
          {
            $project: {
              email: 1,
              dep: 1,
              "service.e_research._id": 1,
              "service.e_research.active": 1,
              "service.e_research.position": 1,
              "service.e_research.createdAt": 1,
            },
          },
          { $sort: { "service.e_research.createdAt": -1 } },
          { $unwind: "$service.e_research" },
          {
            $group: {
              _id: "$email",
              email: { $last: "$email" },
              active: { $last: "$service.e_research.active" },
              position: { $last: "$service.e_research.position" },
              created: { $last: "$service.e_research.createdAt" },
            },
          },
          { $match: { active: "ACTIVE" } },
          { $match: { position: "ADMIN" } },
        ])
          .then((committee_email) => res.json(committee_email))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  getAdmin();
});

module.exports = router;
