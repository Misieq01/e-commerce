import React from "react";
import { Route } from "react-router-dom";
import DataPanel from "../../../components/DataPanel";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import Products from "./Products";
import Categories from "./Categories";

import {ReactComponent as ArrowIcon} from '../../../assets/arrow1-icon.svg'
import {ReactComponent as ProductsIcon} from '../../../assets/products-icon.svg'
import {ReactComponent as AddIcon} from '../../../assets/add-round-icon.svg'

const ProductPanel = () => {
  return (
    // <div className="admin-product-panel__container">
    //   <h2 className="admin-product-panel__title">Products</h2>
    //   <Route exact path="/Admin/Products/AddProduct" component={AddProduct} />
    //   <Route exact path="/Admin/Products/AddCategory" component={AddCategory} />
    //   <div className="admin-product-panel__boxes-wrapper">
    //     <DataPanel title="Products" button buttonText="Add product" addLink="/Admin/Products/AddProduct" size="big">
    //       <Products />
    //     </DataPanel>
    //     <DataPanel
    //       title="Categories"
    //       button
    //       buttonText="Add category"
    //       addLink="/Admin/Products/AddCategory"
    //       size="medium"
    //     >
    //       <Categories />
    //     </DataPanel>
    //   </div>
    // </div>
    <div className="admin-product-panel__container">
      <div className="admin-product-panel__head">
        <div className="admin-product-panel__wrapper">
          <div className="admin-product-panel__head-flex">
            <div className="admin-product-panel__head-content-selector--wrapper">
              <div className="admin-product-panel__head-content-selector--container">
                <ProductsIcon className="admin-product-panel__head-content-selector--icon" />
                <span className="admin-product-panel__head-content-selector--text">Products Manager</span>
                <ArrowIcon className="admin-product-panel__head-content-selector--arrow" />
              </div>
            </div>
            <button className="admin-product-panel__head-button">
              <AddIcon className="admin-product-panel__head-button--icon" />
              <span className="admin-product-panel__head-button--text">Create product</span>
            </button>
          </div>
        </div>
      </div>
      <div className="admin-product-panel__body">
        <div className="admin-product-panel__wrapper"></div>
      </div>
    </div>
  );
};

export default ProductPanel;
