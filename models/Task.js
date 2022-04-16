const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please enter a task name"],
    },
    info: {
      type: String,
      required: [true, "Please provide details for the task"],
    },
    due: {
      type: Date,
      required: [true, "Please provide a due date"],
    },
    complete: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
