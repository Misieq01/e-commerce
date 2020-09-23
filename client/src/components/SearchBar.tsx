import React from "react";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

type TProps = {
  placeHolder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ placeHolder,value,onChange }: TProps) => {
  return (
    <div className="search-bar__container">
      <SearchIcon className="search-bar__icon" />
      <input type="text" className="search-bar__input" placeholder={placeHolder} value={value} onChange={event=>onChange(event)}/>
    </div>
  );
};

export default SearchBar;
