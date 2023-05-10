import { TASK_ACTION_TYPES } from "./task.types";
import { ITask } from "../../shared-Interfaces/sharedInterfaces";

interface IAction {
  type: string;
  payload: any;
}

interface IState {
  tasks: ITask[];
}

const INITIAL_STATE: IState = {
  tasks: [],
};

export const taskReducer = (state: IState = INITIAL_STATE, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_ACTION_TYPES.SET_CURRENT_TASK:
      return {
        ...state,
        tasks: payload,
      };
    case TASK_ACTION_TYPES.CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    case TASK_ACTION_TYPES.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };
    case TASK_ACTION_TYPES.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? payload : task
        ),
      };
    default:
      return state;
  }
};
