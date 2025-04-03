import ConfigAbout from "./ConfigAbout";
import ConfigAddItem from "./ConfigAddItem";
import ConfigSettings from "./ConfigSettings";

const ConfigDropdown = () => {
  return (
    <div className="dropdown">
        
    <i className="bi bi-gear shade-hover fs-3" data-bs-toggle="dropdown" title="Settings"></i> 
    
    <ul className="dropdown-menu">
      <li><ConfigAddItem></ConfigAddItem></li>
      <li><ConfigSettings></ConfigSettings></li>
      <li><hr className="dropdown-divider"></hr></li>
      <li><ConfigAbout></ConfigAbout></li>
    </ul>
  </div>
  );
};

export default ConfigDropdown;
