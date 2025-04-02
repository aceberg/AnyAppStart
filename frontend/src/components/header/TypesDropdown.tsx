import { useState } from "react";
import TypeAdd from "./TypeAdd";
import TypesList from "./TypesList";


const TypesDropdown = () => {

  const [updTypes, setUpdTypes] = useState<boolean>(false);

  return (
    <div className="dropdown">
        
    <i className="bi bi-inboxes shade-hover fs-3" data-bs-toggle="dropdown" title="Types"></i> 
    
    <ul className="dropdown-menu">
      <li><TypeAdd updTypes={updTypes} setUpdTypes={setUpdTypes}></TypeAdd></li>
      <li><hr className="dropdown-divider"></hr></li>
      <TypesList updTypes={updTypes} setUpdTypes={setUpdTypes}></TypesList>
    </ul>
  </div>
  );
};

export default TypesDropdown;
