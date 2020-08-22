import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";

import { Dispatch, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IFetchProducts, IAddProduct, IProduct } from "../types/productTypes";
import { IErrorMessage } from "../types/errorTypes";

type TFetchAllProducts = IFetchProducts | IErrorMessage;

export const fetchAllProducts: ActionCreator<ThunkAction<
  Promise<TFetchAllProducts>,
  IProduct[],
  null,
  TFetchAllProducts
>> = () => async (dispatch: Dispatch<TFetchAllProducts>) =>
  await axios
    .get("/GetAllProducts")
    .then((res) => {
      return dispatch({ type: "FETCH_PRODUCTS", payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: "ERROR_MESSAGE", payload: "We couldn't fetch products for you" });
    });

type TAddProduct = IAddProduct | IErrorMessage;

export const addProduct: ActionCreator<ThunkAction<Promise<TAddProduct>, IProduct, null, TAddProduct>> = (
  product: IProduct
) => async (dispatch: Dispatch<TAddProduct>) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      AdminAuthorization: "Bearer " + localStorage.getItem("adminToken"),
    },
  };

  return axios
    .post("/AddProduct", product, config)
    .then((res) => {
      return dispatch({ type: "ADD_PRODUCT", payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: "ERROR_MESSAGE", payload: "Something went wrong with adding product" });
    });
};
