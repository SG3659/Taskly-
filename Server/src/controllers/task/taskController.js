import asyncHandler from "express-async-handler";
import Task from "../../models/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  // console.log(req.user._id)
  try {
    const { title, description, dueDate, priority, status } = req.body;
    if (!title || title.trim() === "") {
      res.status(400).json({
        message: "Title is required",
      });
    }
    if (!description || description.trim() === "") {
      res.status(400).json({
        message: "description is required",
      });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json("Something went wrong ", error.message);
    console.log(error.message);
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const UserID = req.user._id;
    if (!UserID) {
      res.status(400).json({
        message: "User Not Found",
      });
    }
    const tasks = await Task.find({ user: UserID });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json("Something went wrong ", error.message);
    console.log(error.message);
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const UserID = req.user._id;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Provide valid id",
      });
    }
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({
        message: "Task is not found",
      });
    }
    if (!task.user.equals(UserID)) {
      response.status(401).json({
        message: "Not authorized to view this task",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json("Something went wrong ", error.message);
    console.log(error.message);
  }
});
export const updateTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, completed } =
      req.body;
    const UserID = req.user._id;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "User Not Found",
      });
    }
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({
        message: "task not found",
      });
    }
    if (!task.user.equals(UserID)) {
      res.status(401).json({
        message: "Not authorized",
      });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json("Something went wrong ", error.message);
    console.log(error.message);
  }
});
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const UserID = req.user._id;
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({
        message: "Task Not Found",
      });
    }
    if (!task.user.equals(UserID)) {
      res.status(401).json({
        message: "Not authorized",
      });
    }
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json("Something went wrong ", error.message);
    console.log(error.message);
  }
});

/// Nuclear option for deleting all tasks
export const deleteAllTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TaskModel.find({ user: userId });

    if (!tasks) {
      res.status(404).json({ message: "No tasks found!" });
    }

    // check if the user is the owner of the task
    if (!tasks.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.deleteMany({ user: userId });

    return res.status(200).json({ message: "All tasks deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteAllTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});