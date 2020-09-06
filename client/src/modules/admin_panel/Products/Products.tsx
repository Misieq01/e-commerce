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
        <div className="data-panel-element__container" key={e._id}>
          <div>{e.name}</div>
          <div>{e.description}</div>
          <div>{e.category.name}</div>
          <div>{e.price}</div>
          <div>Show images</div>
          {/* {e.images.map((el, i) => (
            <img className="data-panel-element__img" src={el} key={i} />
          ))} */}
          <div>Edit</div>
          <div>Delete</div>
        </div>
      );
    })}
  </>
);
};

export default Products;
