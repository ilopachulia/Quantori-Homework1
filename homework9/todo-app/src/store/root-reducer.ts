import { combineReducers } from "redux";
import { taskReducer } from "./task/task.reducer";

export const rootReducer = combineReducers({
  task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
