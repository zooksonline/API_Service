const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// auth Login Page (/)
router.post("/", (req, res) => {
  const authUser = async () => {
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
        // User Model
        const User = require("../../models/User");
        const { buasri_id } = req.body;
        console.log(buasri_id);
        if (!buasri_id) {
          return res.status(400).json({ msg: "โปรดใส่ข้อมูลให้ครบทุกช่อง" });
        }
        mongoose.set("useFindAndModify", false);
        User.findOne({ buasri_id }).then((user) => {
          if (!user)
            return res.status(400).json({ msg: "BuasriID ไม่มีอยู่ในระบบ" });
          jwt.sign(
            {
              id: user.id,
              buasri_id: user.buasri_id,
              firstname: user.firstname,
              lastname: user.lastname,
              dep: user.dep,
              position: user.position,
              type: user.type,
            },
            config.get("jwtSecret"),
            { expiresIn: 28800 },
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
        });
      })
      .catch((err) => console.log(err));
  };
  authUser();
});

// auth with Token (/user)
router.get("/user", auth, (req, res) => {
  const authwithToken = async () => {
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
        User.findById(req.user.id).then((user) => res.json(user));
      })
      .catch((err) => console.log(err));
  };
  authwithToken();
});
module.exports = router;
