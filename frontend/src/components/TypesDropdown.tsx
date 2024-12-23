

const TypesDropdown = () => {
  return (
    <div className="dropdown">
        
    <i className="bi bi-inboxes shade-hover fs-3 dropdown-toggle" data-bs-toggle="dropdown" title="Settings"></i> 
    
    <ul className="dropdown-menu">
      <li><a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#themeModal">Add Type</a></li>
      <li><a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#aboutModal">Types</a></li>
    </ul>
  </div>
  );
};

export default TypesDropdown;
