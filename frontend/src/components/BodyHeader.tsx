import { useState } from "react";
import BodyAddItem from "./BodyAddItem";
import { Item } from "../functions/exports";

function BodyHeader(_props: any) {

  const items = _props.items;

  const [filterOptions, setFilterOptions] = useState<Map<string, number>>(new Map());
  const [field, setField] = useState<keyof Item>("Exec");

  const makeOptionMap = (fieldName:keyof Item) => {
    // console.log("FIELD, ITEMS", fieldName, items);
    const mapOfOptions = new Map();
    for (let i=0; i<items.length; i++) {
      mapOfOptions.set(items[i][fieldName], 1);
    }
    // console.log("OPTIONS", mapOfOptions);
    
    setField(fieldName);
    setFilterOptions(mapOfOptions);
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    // console.log("SELECTED", selectedValue);

    if (selectedValue === "") { // clear filter
      setFilterOptions(new Map());
      _props.setFilterRes({Field: "Exec", Option: ""});
      _props.setUpdBody(true);      
    } else {
      const key = selectedValue as keyof Item;
      makeOptionMap(key);
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    // console.log("FILTER", key);

    if (key !== "") {
      _props.setFilterRes({Field: field, Option: key});
      _props.setUpdBody(true);
    }
  };

  return (
    <div className='d-flex justify-content-between'>
      <div className="input-group w-50">
        <button className="btn btn-outline-primary" disabled>Filter</button>
        
          <select className="form-select" defaultValue="" onChange={handleChange}>
            <option value="">No filter...</option>
            <option value="Group">Group</option>
            <option value="State">State</option>
            <option value="Type">Type</option>
          </select>
          <select className="form-select" defaultValue="" onChange={handleFilter}>
            <option value="" disabled></option>
            {Array.from(filterOptions.entries()).map(([key]) => (                    
            <option key={key} value={key}>{key}</option>
            ))}
          </select>
        
      </div>
      <BodyAddItem setUpdBody={_props.setUpdBody}></BodyAddItem>
    </div>
  )
}

export default BodyHeader
