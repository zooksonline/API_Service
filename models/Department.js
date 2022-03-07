const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HistorySchema = new Schema({
  _id: false,
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  nameTH: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const DepartmentSchema = new Schema(
  {
    currentNameTH: {
      type: String,
      required: true,
    },
    currentNameEN: {
      type: String,
      required: true,
    },
    history: [HistorySchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Department = mongoose.model("department", DepartmentSchema);
