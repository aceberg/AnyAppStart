import TypeAdd from "./TypeAdd";
import TypesList from "./TypesList";


const TypesDropdown = () => {
  return (
    <div className="dropdown">
        
    <i className="bi bi-inboxes shade-hover fs-3 dropdown-toggle" data-bs-toggle="dropdown" title="Settings"></i> 
    
    <ul className="dropdown-menu">
      <li><TypeAdd></TypeAdd></li>
      <li><TypesList></TypesList></li>
    </ul>
  </div>
  );
};

export default TypesDropdown;
