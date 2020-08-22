import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IProduct, IFetchProducts } from "../../../store/types/productTypes";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../store/actions/productActions";
import { ICategoryDB } from "../../../store/types/categoryTypes";
import { IRootState } from "../../../store/types/rootStateType";
import { ThunkDispatch } from "redux-thunk";

import Background from "../../../components/Background";

type AppDispatch = ThunkDispatch<IProduct, any, IFetchProducts>;
interface Idata extends IProduct {
  category: string
}

const AddProduct = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: IRootState) => state.categories.categories);

  const [data, setData] = useState<Idata>({
    name: "",
    description: "",
    category: "",
    price: 0,
    images: null,
    quantity: 0,
    active: false,
  });

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, images: event.target.files });
  };
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category: ICategoryDB | undefined = categories.find((el) => el.name === event.target.value);
    if (category !== undefined) setData({ ...data, category: category._id });
  };

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "true" ? true : false;
    setData({ ...data, active: value });
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setData({ ...data, [field]: event.target.value });
  };

  const sumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < data.images!.length; i++) {
      formData.append("image", data.images![i]);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());

    dispatch(addProduct(formData)).then(() => {
      history.push("/Admin/Products");
    });
  };

  return (
    <>
      <Background backRoute="/Admin/Products" />
      <div className="add-product__container">
        <form onSubmit={(event) => sumbitHandler(event)}>
          <input type="file" name="image" multiple onChange={(event) => imageHandler(event)} />
          <input type="text" placeholder="name" onChange={(event) => inputHandler(event, "name")} />
          <input type="text" placeholder="description" onChange={(event) => inputHandler(event, "description")} />
          <select name="category" defaultValue="" onChange={(event) => selectHandler(event)}>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((e) => {
              return e.active ? (
                <option value={e.name} key={e.name}>
                  {e.name}
                </option>
              ) : null;
            })}
          </select>
          <input type="number" placeholder="price" onChange={(event) => inputHandler(event, "price")} />
          <input type="number" placeholder="quantity" onChange={(event) => inputHandler(event, "quantity")} />
          Yes
          <input type="radio" name="active" id="true" value="true" onChange={(event) => radioHandler(event)} />
          No
          <input type="radio" name="active" id="false" value="false" onChange={(event) => radioHandler(event)} />
          <input type="submit" value="add"></input>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
