export const ERROR_MESSAGE = "ERROR_MESSAGE";

export interface IErrorMessage {
  type: typeof ERROR_MESSAGE;
  payload: string;
}

export interface IErrorState{
    error: string
}

export type ActionTypes = IErrorMessage