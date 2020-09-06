import React from "react";
import { useHistory } from "react-router-dom";

interface DataPanel {
  children: React.ReactNode;
  title: string;
  button?: boolean;
  buttonText?: string
  addLink?: string
  size: string
}

const DataPanel = ({ children, title, button = false, buttonText,addLink = '',size }: DataPanel) => {

    const history = useHistory()

  return (
    <div className={"data-panel__container--" + size}>
      <div className="data-panel__header">
        <span className="data-panel__title">{title}</span>
        {button ? <div className="data-panel__add-button" onClick={() => history.push(addLink)}>
            {buttonText}
        </div> : null}
      </div>
      {children}
    </div>
  );
};

export default DataPanel;
