const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../../../middleware/auth");

// Get all Research Admin
router.get("/admin", auth, (req, res) => {
  // console.log("in");
  const adminlist = async () => {
    // DB Config
    const mongoose = require("mongoose");
    const db = config.get("mongoUsers");
    const option = config.get("option");

    //   Connect Mongo
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const List = require("../../../../models/User");
        List.aggregate([
          {
            $project: {
              buasri_id: "$buasri_id",
              firstname: "$firstname",
              lastname: "$lastname",
              email: "$email",
              dep: "$dep",
              e_research: {
                $ifNull: ["$service.e_research", [null]],
              },
            },
          },
          { $unwind: "$e_research" },
          {
            $group: {
              _id: "$_id",
              list: {
                $push: {
                  list_buasri: "$buasri_id",
                  list_firstname: "$firstname",
                  list_lastname: "$lastname",
                  list_email: "$email",
                  list_dep: "$dep",
                  research_active: "$e_research.active",
                  research_position: "$e_research.position",
                },
              },
            },
          },
          { $unwind: "$list" },
          {
            $group: {
              _id: "$_id",
              buasri_id: { $last: "$list.list_buasri" },
              firstname: { $last: "$list.list_firstname" },
              lastname: { $last: "$list.list_lastname" },
              email: { $last: "$list.list_email" },
              dep: { $last: "$list.list_dep" },
              research_active: { $last: "$list.research_active" },
              research_position: { $last: "$list.research_position" },
            },
          },
          {
            $match: { research_active: "ACTIVE" },
          },
          {
            $match: { research_position: "ADMIN" },
          },
        ])
          .then((Success) => res.json(Success))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  adminlist();
});

module.exports = router;
