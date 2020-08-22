import {ICategoryDB} from './categoryTypes'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'

export interface IProduct {
    name: string,
    description: string,
    category: string | ICategoryDB,
    price: number,
    images: FileList | null | string[],
    quantity: number,
    active: boolean
}

export interface IProductDB extends IProduct {
    _id: string
    images: string[]
    category: ICategoryDB
}

export interface IProductsState {
    products: IProductDB[],
}


export interface IFetchProducts {
    type: typeof FETCH_PRODUCTS,
    payload: IProductDB[]
}

export interface IAddProduct {
    type: typeof ADD_PRODUCT,
    payload: IProductDB
}


export type ActionTypes =  IFetchProducts | IAddProduct;