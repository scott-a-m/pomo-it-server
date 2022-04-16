const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  createTask,
  getAllTasks,
  deleteTask,
  editTask,
  getSingleTask,
} = require("../controllers/taskController");

router.post("/create-task", authenticateUser, createTask);
router.delete("/delete-task/:id", authenticateUser, deleteTask);
router.patch("/edit-task/:id", authenticateUser, editTask);
router.get("/my-tasks", authenticateUser, getAllTasks);
router.get("/my-tasks/:id", authenticateUser, getSingleTask);

module.exports = router;
