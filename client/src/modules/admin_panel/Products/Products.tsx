import React from "react";
import {useSelector} from 'react-redux'
import {IRootState} from '../../../store/types/rootStateType'
import {IProductDB} from '../../../store/types/productTypes'

const Products = () => {

  const products = useSelector((state:IRootState) => state.products.products)
  
return (
  <>
    {products.map((e:IProductDB) => {
      return (
        <div className="admin-product-panel__container" key={e._id}>
          {e.name}
          {e.description}
          {e.category.name}
          {e.price}
          {e.images.map((el, i) => (
            <img className="admin-product-panel__img" src={el} key={i} />
          ))}
        </div>
      );
    })}
  </>
);
};

export default Products;
