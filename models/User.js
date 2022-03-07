const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const position_enum = ["ADMIN", "USER"];
const research_position_enum = ["ADMIN", "COMMITTEE", "USER"];
const qa_position_enum = ["ADMIN", "USER"];
const scihuris_position_enum = ["ADMIN", "USER"];
const budget_position_enum = [
  "ADMIN",
  "PLANNER",
  "EXECUTIVE",
  "COMMITTEE",
  "FINANCE",
  "USER",
];
const active_enum = ["ACTIVE", "INACTIVE"];
const type_enum = ["STAFF", "PROFESSOR", "STUDENT"];

// Create Schema
// Budget Service Schema
const budgetSchema = new Schema(
  {
    active: {
      type: String,
      enum: active_enum,
      default: "INACTIVE",
    },
    position: {
      type: String,
      enum: budget_position_enum,
      default: "USER",
    },
    dep_budget: {
      type: String,
    },
    user_order: {
      type: String,
    },
  },
  { timestamps: true }
);
// Research Service Schema
const researchSchema = new Schema(
  {
    active: {
      type: String,
      enum: active_enum,
      default: "INACTIVE",
    },
    position: {
      type: String,
      enum: research_position_enum,
      default: "USER",
    },
    user_order: {
      type: String,
    },
  },
  { timestamps: true }
);
// QA Service Schema
const qaSchema = new Schema(
  {
    active: {
      type: String,
      enum: active_enum,
      default: "INACTIVE",
    },
    position: {
      type: String,
      enum: qa_position_enum,
      default: "USER",
    },
    user_order: {
      type: String,
    },
  },
  { timestamps: true }
);
// SciHuris Service Schema
const sciHurisSchema = new Schema(
  {
    active: {
      type: String,
      enum: active_enum,
      default: "INACTIVE",
    },
    position: {
      type: String,
      enum: scihuris_position_enum,
      default: "USER",
    },
    user_order: {
      type: String,
    },
  },
  { timestamps: true }
);

// Service Schema
const ServiceSchema = new Schema(
  {
    e_research: [researchSchema],
    e_qa: [qaSchema],
    e_scihuris: [sciHurisSchema],
    e_budget: [budgetSchema],
  },
  { timestamps: true }
);
// Main User
const UserSchema = new Schema(
  {
    buasri_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dep: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: position_enum,
      default: "USER",
      required: true,
    },
    active: {
      type: String,
      enum: active_enum,
      default: "INACTIVE",
      required: true,
    },
    type: {
      type: String,
      enum: type_enum,
      default: "STAFF",
      require: true,
    },
    service: ServiceSchema,
    register_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
