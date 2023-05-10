type Action<T> = {
  type: string;
  payload: T;
};

export function createAction<T>(type: string, payload: T): Action<T> {
  return { type, payload };
}
