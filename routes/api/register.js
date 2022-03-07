const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

// register user (/)
router.post("/", (req, res) => {
  const registerUser = async () => {
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
        //   Model
        const User = require("../../models/User");
        // req data
        const {
          buasri_id,
          title,
          firstname,
          lastname,
          email,
          dep,
          position,
          active,
          type,
        } = req.body;
        // Check req data is corrected?
        if (
          !buasri_id ||
          !title ||
          !firstname ||
          !lastname ||
          !email ||
          !dep ||
          !type
        ) {
          return res.status(500).json({ msg: "โปรดใส่ข้อมูลให้ครบทุกช่อง" });
        }
        mongoose.set("useFindAndModify", false);
        User.findOne({ buasri_id }).then((user) => {
          if (user)
            return res
              .status(400)
              .json({ msg: "BuasriID นี้มีอยู่ในระบบแล้ว" });

          const newUser = new User({
            buasri_id,
            title,
            firstname,
            lastname,
            email,
            dep,
            position,
            type,
            active,
          });

          newUser
            .save()
            .then((user) => {
              jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token: token,
                    user: {
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
                    },
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };
  registerUser();
});

module.exports = router;
