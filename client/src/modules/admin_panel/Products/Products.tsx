import React,{useState} from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/types/rootStateType";
import { IProductDB } from "../../../store/types/productTypes";
import SearchBar from '../../../components/SearchBar'


const Products = () => {
  const products = useSelector((state: IRootState) => state.products.products);
  const [searchValue, search] = useState<string>('')

  const searchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    search(event.target.value)
  };

  const filteredProducts = searchValue !== '' ? products.filter(e=>e.name.includes(searchValue)) : products

  const body = filteredProducts.map((e) => {
    const name = e.name.length > 40 ? e.name.substr(0,40) + '...' : e.name
    return (
      <tr>
        <td className="table__image-and-text-cell">
          <img src={e.images[0]} /> <span>{name}</span>
        </td>
        <td>{e.price} zł</td>
        <td>{e.quantity} in stock</td>
        <td>{e.category}</td>
        <td>{e.active === true ? "Active" : "Disable"}</td>
        <td></td>
      </tr>
    );
  });

  return (
    <div>
      <SearchBar placeHolder='Find product' value={searchValue} onChange={searchItem}/>
      <table className="table">
        <thead>
          <tr>
            <th style={{width:'400px'}}>Product</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default Products;
