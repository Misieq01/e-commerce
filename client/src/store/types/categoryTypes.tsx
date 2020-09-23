export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";

export interface ICategory {
  name: string;
  active: boolean;
  subCategories?: Array<ICategory>;
}

export interface ICategoryDB extends ICategory {
  _id: string;
}


export interface ICategoriesState {
    categories: ICategoryDB[]
}

export interface IFetchCategories {
  type: typeof FETCH_CATEGORIES;
  payload: ICategoryDB[];
}

export interface IAddCategory {
  type: typeof ADD_CATEGORY;
  payload: ICategoryDB;
}

export type ActionTypes = IFetchCategories | IAddCategory