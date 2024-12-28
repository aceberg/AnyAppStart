import ConfigAbout from "./ConfigAbout";
import ConfigItemAdd from "./ConfigItemAdd";
import ConfigSettings from "./ConfigSettings";

const ConfigDropdown = (_props: any) => {
  return (
    <div className="dropdown">
        
    <i className="bi bi-gear shade-hover fs-3" data-bs-toggle="dropdown" title="Settings"></i> 
    
    <ul className="dropdown-menu">
      <li><ConfigItemAdd></ConfigItemAdd></li>
      <li><ConfigSettings headUpd={_props.headUpd}></ConfigSettings></li>
      <li><hr className="dropdown-divider"></hr></li>
      <li><ConfigAbout></ConfigAbout></li>
    </ul>
  </div>
  );
};

export default ConfigDropdown;
