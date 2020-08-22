import React from 'react'
import {Route} from 'react-router-dom'
import DataPanel from '../../../components/DataPanel'
import AddProduct from './AddProduct'
import AddCategory from './AddCategory'
import Products from './Products'
import Categories from './Categories'
const ProductPanel = () =>{
      return (
        <div className="admin-product-panel__container">
          <h2>Products</h2>
          <Route exact path="/Admin/Products/AddProduct" component={AddProduct} />
          <Route exact path="/Admin/Products/AddCategory" component={AddCategory} />
          <DataPanel title="Products" button buttonText="Add product" addLink="/Admin/Products/AddProduct">
            <Products/>
          </DataPanel>
          <DataPanel title="Categories" button buttonText="Add category" addLink="/Admin/Products/AddCategory">
            <Categories/>
          </DataPanel>
        </div>
      );
}

export default ProductPanel