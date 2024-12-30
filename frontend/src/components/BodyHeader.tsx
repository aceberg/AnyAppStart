import { useState } from "react";
import { Item } from "../functions/api";
import BodyAddItem from "./BodyAddItem";

function BodyHeader(_props: any) {

  const items = _props.items;

  const [filterOptions, setFilterOptions] = useState<Map<string, number>>(new Map());
  const [field, setField] = useState<keyof Item>("Exec");

  const handleSelect = (fieldName:keyof Item) => {
    console.log("FIELD, ITEMS", fieldName, items);
    const mapOfOptions = new Map();
    for (let i=0; i<items.length; i++) {
      mapOfOptions.set(items[i][fieldName], 1);
    }
    console.log("OPTIONS", mapOfOptions);
    
    setField(fieldName);
    setFilterOptions(mapOfOptions);
  }

  const handleFilter = (key: string) => {
    _props.setFilterRes({Field: field, Option: key});
    _props.setUpdBody(true);
  }

  const handleClear = () => {
    setFilterOptions(new Map());
    _props.setFilterRes({Field: "Exec", Option: ""});
    _props.setUpdBody(true);
  }

  return (
    <div className='d-flex justify-content-between'>
      <div className="input-group w-50">
        <button className="btn btn-outline-primary" disabled>Filter</button>
        
          <select className="form-select" defaultValue="">
            <option onClick={handleClear}></option>
            <option onClick={() => handleSelect("Group")}>Group</option>
            <option onClick={() => handleSelect("State")}>State</option>
            <option onClick={() => handleSelect("Type")}>Type</option>
          </select>
          <select className="form-select" defaultValue="">
            <option disabled></option>
            {Array.from(filterOptions.entries()).map(([key]) => (                    
            <option key={key} onClick={() => handleFilter(key)}>{key}</option>
            ))}
          </select>
        
      </div>
      <BodyAddItem setUpdBody={_props.setUpdBody}></BodyAddItem>
    </div>
  )
}

export default BodyHeader
