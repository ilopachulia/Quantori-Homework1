import { TASK_ACTION_TYPES } from "./task.types";
import { createAction } from "../utils/reducer/reducer.utils";

export const setTasks = (tasks) =>
  createAction(TASK_ACTION_TYPES.SET_CURRENT_TASK, tasks);

export const deleteTask = (taskId) =>
  createAction(TASK_ACTION_TYPES.DELETE_TASK, taskId);

export const updateTask = (task) =>
  createAction(TASK_ACTION_TYPES.UPDATE_TASK, task);

export const createTask = (newTask) =>
  createAction(TASK_ACTION_TYPES.CREATE_TASK, newTask);
