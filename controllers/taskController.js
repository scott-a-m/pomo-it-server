const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const task = await Task.create(req.body);

  res.status(StatusCodes.CREATED).json(task);
};

const getAllTasks = async (req, res) => {
  userId = req.user.userId;

  const tasks = await Task.find({ createdBy: userId });

  res.status(StatusCodes.OK).json(tasks);
};

const getSingleTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  });

  if (!task) {
    throw new CustomError.BadRequestError("You have not task with this ID.");
  }

  res.status(StatusCodes.OK).json(task);
};

const editTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  const { task, info, due, complete } = req.body;

  const editedTask = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  });

  if (!editedTask) {
    throw new CustomError.BadRequestError("You have not task with this ID.");
  }

  if (complete) {
    editedTask.complete = complete;
  }

  editedTask.task = task;
  editedTask.info = info;
  editedTask.due = due;

  await editedTask.save();

  res.status(StatusCodes.OK).json({ msg: "task updated" });
};

const deleteTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
  });

  if (!task) {
    throw new CustomError.BadRequestError(
      `You have no task with the id: ${taskId}.`
    );
  }

  res.status(StatusCodes.OK).json({ msg: "task deleted" });
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  editTask,
  getSingleTask,
};
