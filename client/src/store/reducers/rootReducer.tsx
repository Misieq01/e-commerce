import {combineReducers} from 'redux'
import {IRootState} from '../types/rootStateType'

import {productsReducer} from './productsReducer'
import {errorReducer} from './errorReducer'
import {categoriesReducer} from './categoriesReducer'

export const rootReducer = combineReducers<IRootState>({
    products: productsReducer,
    categories: categoriesReducer,
    error: errorReducer
})
