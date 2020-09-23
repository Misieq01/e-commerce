import React, { useState, useRef, RefObject } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import { IRootState } from "../../../store/types/rootStateType";
import DataPanel from "../../../components/DataPanel";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import Products from "./Products";
import Categories from "./Categories";
import PopupPortal from "../../../components/PopupPortal";

import { ReactComponent as ArrowIcon } from "../../../assets/arrow1-icon.svg";
import { ReactComponent as ProductsIcon } from "../../../assets/products-icon.svg";
import { ReactComponent as AddIcon } from "../../../assets/add-round-icon.svg";
import { routes } from "../../../routes";
import { IProductDB } from "../../../store/types/productTypes";
import { ICategoryDB } from "../../../store/types/categoryTypes";

interface IDomRect {
  readonly bottom: number;
  readonly height: number;
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

interface IConfigItem {
  readonly route: string;
  readonly title: string;
  readonly buttonText: string;
  readonly addRoute: string;
}

interface IPopup {
  parent: RefObject<HTMLDivElement>;
  otherConfigElements: IConfigItem[];
  close: () => void;
}

type TType = {type: 'products' | 'categories'}

const config: IConfigItem[] = [
  { route: "products", title: "Products Manager", buttonText: "Create product",addRoute: routes.addProduct },
  { route: "categories", title: "Categories Manager", buttonText: "Add category", addRoute: routes.addCategory },
  // { route: "brands", title: "Brands Manager", buttonText: "Make new brand" },
];

const Popup = ({ parent, otherConfigElements, close }: IPopup) => {
  const history = useHistory();

  const clickHandler = (route: string) => {
    history.push(routes[route]);
    close();
  };

  const data = parent.current?.getBoundingClientRect() as IDomRect;
  const { bottom, height, left, right, top, width, x, y }: IDomRect = data;
  
  return (
    <div
      style={{ width: width + "px", top: top + height + 10 + "px", left: left }}
      className="admin-product-panel__head-popup__container"
    >
      {otherConfigElements.map((el) => (
        <div key={el.route} className="admin-product-panel__head-popup__element" onClick={() => clickHandler(el.route)}>
          {el.title}
        </div>
      ))}
    </div>
  );
};

const ProductPanel = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const { type }: TType = useParams();
  const presentConfig = config.find((e) => e.route === type);
  const otherConfigs = config.filter((el) => el.route !== type);
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory()

  const showPopup = () => {
    setPopup(true);
  };
  const closePopup = () => {
    //Timeout added to make closing last
    //Because when popup is on and you click on content selector container
    //It will fire closePopup in portalPopup and then showPopup here
    //So adding timeout shifts order and make it right
    setTimeout(() => setPopup(false), 0);
  };

  // const cfg: TConfig = data[0].type ==='products' ? {type: 'products',products: data} : {type:'categories',categories:data}

  return (
    <div className="admin-product-panel__container">
      <Route path={routes.addCategory} component={AddCategory} />
      <Route path={routes.addProduct} component={AddProduct} />
      <div className="admin-product-panel__head">
        <div className="admin-product-panel__wrapper">
          <div className="admin-product-panel__head-flex">
            <div className="admin-product-panel__head-content-selector--wrapper">
              <div className="admin-product-panel__head-content-selector--container" onClick={showPopup} ref={ref}>
                <ProductsIcon className="admin-product-panel__head-content-selector--icon" />
                <span className="admin-product-panel__head-content-selector--text">{presentConfig?.title}</span>
                <ArrowIcon
                  className="admin-product-panel__head-content-selector--arrow"
                  style={{ transform: popup ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </div>
              {popup ? (
                <PopupPortal close={closePopup}>
                  <Popup parent={ref} otherConfigElements={otherConfigs} close={closePopup} />
                </PopupPortal>
              ) : null}
            </div>
            <button className="admin-product-panel__head-button" onClick={() => history.push(presentConfig!.addRoute)}>
              <AddIcon className="admin-product-panel__head-button--icon" />
              <span className="admin-product-panel__head-button--text">{presentConfig?.buttonText}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="admin-product-panel__body">
        <div className="admin-product-panel__wrapper">
          {type === "products" ? <Products /> : null}
          {/* {type === 'categories' ? <Categories/> : null} */}
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
