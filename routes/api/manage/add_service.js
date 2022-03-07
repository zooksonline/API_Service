const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../../middleware/auth");

// Add Research Service
router.put("/research", auth, (req, res) => {
  const addResearch = async () => {
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
        const User = require("../../../models/User");
        const { buasri_id, user_order, position, active } = req.body;
        mongoose.set("useFindAndModify", false);
        User.findOneAndUpdate(
          { buasri_id },
          {
            $push: {
              "service.e_research": { active, position, user_order },
            },
          },
          { new: true }
        ).then((Success) => res.json(Success));
      })
      .catch((err) => console.log(err));
  };
  addResearch();
});

// Add QA Service
router.put("/qa", auth, (req, res) => {
  const addQA = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoUsers");

    // Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../../models/User");
        const { buasri_id, user_order, position, active } = req.body;
        mongoose.set("useFindAndModify", false);
        User.findOneAndUpdate(
          { buasri_id },
          {
            $push: {
              "service.e_qa": { active, position, user_order },
            },
          },
          { new: true }
        ).then((Success) => res.json(Success));
      })
      .catch((err) => console.log(err));
  };
  addQA();
});

// Add SciHuris Service
router.put("/scihuris", auth, (req, res) => {
  const addSciHuris = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoUsers");

    // Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../../models/User");
        const { buasri_id, user_order, active, position } = req.body;
        mongoose.set("useFindAndModify", false);
        User.findOneAndUpdate(
          { buasri_id },
          {
            $push: {
              "service.e_scihuris": { active, position, user_order },
            },
          },
          { new: true }
        ).then((Success) => res.json(Success));
      })
      .catch((err) => console.log(err));
  };
  addSciHuris();
});

// Add Budget Service
router.put("/budget", auth, (req, res) => {
  const addBudget = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoUsers");

    // Connect Mongo
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../../models/User");
        const { buasri_id, user_order, position, dep_budget, active } =
          req.body;
        mongoose.set("useFindAndModify", false);
        User.findOneAndUpdate(
          { buasri_id },
          {
            $push: {
              "service.e_budget": { active, position, dep_budget, user_order },
            },
          },
          { new: true }
        ).then((Success) => res.json(Success));
      })
      .catch((err) => console.log(err));
  };
  addBudget();
});

module.exports = router;
