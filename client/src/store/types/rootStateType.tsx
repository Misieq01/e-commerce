import {IProductsState} from './productTypes'
import {ICategoriesState} from './categoryTypes'
import {IErrorState} from './errorTypes'

export interface IRootState {
  products: IProductsState;
  categories: ICategoriesState;
  error: IErrorState;
}