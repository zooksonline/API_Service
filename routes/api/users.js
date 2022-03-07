const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");

// list users ("/")
router.get("/", auth, (req, res) => {
  const userlist = async () => {
    // Connect Mongo
    const db = config.get("mongoUsers");
    const option = config.get("option");
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        User.aggregate([
          {
            $project: {
              buasri_id: "$buasri_id",
              firstname: "$firstname",
              lastname: "$lastname",
              type: "$type",
              dep: "$dep",
            },
          },
        ])
          .then((Success) => res.json(Success))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  userlist();
});

// update user ("/update")
router.put("/update", auth, (req, res) => {
  const updateUser = async () => {
    // Connect Mongo
    const db = config.get("mongoUsers");
    const option = config.get("option");
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        const {
          buasri_id,
          title,
          firstname,
          lastname,
          dep,
          position,
          type,
          active,
        } = req.body;
        mongoose.set("useFindAndModify", false);
        User.findOneAndUpdate(
          { buasri_id },
          { title, firstname, lastname, dep, position, type, active },
          { new: true }
        ).then((user) =>
          res.json({
            id: user.id,
            buasri_id: user.buasri_id,
            title: user.title,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            dep: user.dep,
            position: user.position,
            type: user.type,
            active: user.active,
          })
        );
      })
      .catch((err) => console.log(err));
  };
  updateUser();
});

module.exports = router;
