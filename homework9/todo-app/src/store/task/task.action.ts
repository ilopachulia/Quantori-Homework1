import { TASK_ACTION_TYPES } from "./task.types";
import { createAction } from "../utils/reducer/reducer.utils";
import { ITask } from "../../shared-Interfaces/sharedInterfaces";

export const setTasks = (tasks: ITask[]) =>
  createAction(TASK_ACTION_TYPES.SET_CURRENT_TASK, tasks);

export const deleteTask = (taskId?: number) =>
  createAction(TASK_ACTION_TYPES.DELETE_TASK, taskId);

export const updateTask = (task: ITask) =>
  createAction(TASK_ACTION_TYPES.UPDATE_TASK, task);

export const createTask = (newTask: ITask) =>
  createAction(TASK_ACTION_TYPES.CREATE_TASK, newTask);
