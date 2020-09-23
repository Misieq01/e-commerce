import { IRootState } from '../types/rootStateType'

export const getDataForProductsPage = (state:IRootState,type:'categories' | 'products') => {switch(type){
    case 'products':
        return state.products.products
    case 'categories':
        return state.categories.categories
}}