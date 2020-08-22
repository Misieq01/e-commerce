import { ActionTypes, IErrorState, ERROR_MESSAGE } from "../types/errorTypes";
import { Reducer } from "redux";

const initialState: IErrorState = {
  error: "",
};

export const errorReducer: Reducer<IErrorState, ActionTypes> = (
  state: IErrorState = initialState,
  action: ActionTypes
): IErrorState => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
