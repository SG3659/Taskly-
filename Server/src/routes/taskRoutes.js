import express from "express";
const router = express.Router();
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
router.post("/task/create", protect, createTask);
router.get("/Tasks", protect, getTasks);
router.get("/Task/:id", protect, getTask);
router.patch("/Task/:id", protect, updateTask);
router.delete("/Task/:id", protect,deleteTask)
export default router;
