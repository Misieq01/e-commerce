import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";

import { Dispatch, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { IFetchCategories, IAddCategory, ICategory } from "../types/categoryTypes";
import { IErrorMessage } from "../types/errorTypes";

type TFetchAllCategories = IFetchCategories | IErrorMessage;

export const fetchAllCategories: ActionCreator<ThunkAction<
  Promise<TFetchAllCategories>,
  ICategory[],
  null,
  TFetchAllCategories
>> = () => async (dispatch: Dispatch<TFetchAllCategories>) => {
  return axios
    .get("/GetAllCategories")
    .then((res) => {
      return dispatch({ type: "FETCH_CATEGORIES", payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: "ERROR_MESSAGE", payload: "We couldn't fetch categories for you" });
    });
};


type TAddCategory = IAddCategory | IErrorMessage;

export const addCategory: ActionCreator<ThunkAction<Promise<TAddCategory>, ICategory, null, TAddCategory>> = (
  category: ICategory
) => {
  return (dispatch: Dispatch<TAddCategory>) => {
    const config = getConfig("admin");
    return axios
      .post("/AddCategory", category, config)
      .then((res) => {
        return dispatch({ type: "ADD_CATEGORY", payload: res.data });
      })
      .catch((err) => {
        return dispatch({ type: "ERROR_MESSAGE", payload: "Something went wrong with adding category" });
      });
  };
};