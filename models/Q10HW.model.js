const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
