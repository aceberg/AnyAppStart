import { useEffect, useState } from "react";
import { getTypes, TypeStruct } from "../functions/api";
import TypeEdit from "./TypeEdit";
import mobxStore from "../functions/store";

function TypesList(_props:any) {

  const [types, setTypes] = useState<TypeStruct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const t = await getTypes(); 
      setTypes(t);
      mobxStore.setTypeList(t);
    };
    
    fetchData();
    _props.setUpdTypes(false);
    return function cleanup() {
      setTypes([]);
    }
  }, [_props.updTypes]);

  return (
    <>
      {types?.map((t, i) => (
        <div key={i}>
          <TypeEdit typeItem={t} setUpdTypes={_props.setUpdTypes}
            btnContent={<li><a href="#" className="dropdown-item">{t.Name}</a></li>}>
          </TypeEdit>              
        </div>
      ))}
    </>
  )
}

export default TypesList
