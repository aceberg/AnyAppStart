import TypeAdd from "./TypeAdd";
import TypesList from "./TypesList";


const TypesDropdown = () => {

  return (
    <div className="dropdown">
        
    <i className="bi bi-inboxes shade-hover fs-3" data-bs-toggle="dropdown" title="Types"></i> 
    
    <ul className="dropdown-menu">
      <li><TypeAdd></TypeAdd></li>
      <li><hr className="dropdown-divider"></hr></li>
      <TypesList></TypesList>
    </ul>
  </div>
  );
};

export default TypesDropdown;
