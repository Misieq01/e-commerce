import {ActionTypes,IProductsState,FETCH_PRODUCTS,ADD_PRODUCT} from '../types/productTypes'
import {Reducer} from 'redux'

const initialState: IProductsState = {
  products: [],
};


export const productsReducer: Reducer<IProductsState, ActionTypes> = (
  state: IProductsState | undefined = initialState,
  action: ActionTypes
): IProductsState => {
  // const newState = {...state}

  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_PRODUCT:
    const newProducts = [...state.products]
    newProducts.push(action.payload)
    return { ...state, products: newProducts };
    default:
      return state;
  }
};
