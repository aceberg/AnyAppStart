import Config from "./Config";

const ConfigDropdown = (_props: any) => {
  return (
    <div className="dropdown">
        
    <i className="bi bi-gear shade-hover fs-3 dropdown-toggle" data-bs-toggle="dropdown" title="Settings"></i> 
    
    <ul className="dropdown-menu">
      <li><a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#themeModal">Add Item</a></li>
      <li><Config headUpd={_props.headUpd}></Config></li>
      <li><hr className="dropdown-divider"></hr></li>
      <li><a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#aboutModal">About</a></li>
    </ul>
  </div>
  );
};

export default ConfigDropdown;
