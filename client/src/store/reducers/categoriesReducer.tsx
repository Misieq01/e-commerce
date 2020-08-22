import { ActionTypes, ICategoriesState, ADD_CATEGORY, FETCH_CATEGORIES } from "../types/categoryTypes";
import { Reducer } from "redux";

const initialState: ICategoriesState = {
  categories: [],
};

export const categoriesReducer: Reducer<ICategoriesState, ActionTypes> = (
  state: ICategoriesState = initialState,
  action: ActionTypes
): ICategoriesState => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
    const newCategories = [...state.categories]
    newCategories.push(action.payload)
    console.log(newCategories)
    return {...state,categories:newCategories};
    default:
      return state;
  }
};
