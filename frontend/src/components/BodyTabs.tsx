import { useEffect } from "react";
import mobxStore from "../functions/store";
import { TypeStruct } from "../functions/exports";


function BodyTabs(_props: any) {

  const typeList = mobxStore.typeList;

  const handleFilter = (key: string) => {
    mobxStore.setFilterType(key);
    mobxStore.setUpdBody(true);
    setMainTab(key);
  };

  const setMainTab = (key: string) => {

    document.getElementById("g1s52lVbKscc")?.classList.remove("btn-tab-main");
    for (let i=0; i<typeList.length; i++) {
      document.getElementById(typeList[i].Name)?.classList.remove("btn-tab-main");
    }
    key === "" ? key = "g1s52lVbKscc" : key = key;
    document.getElementById(key)?.classList.add("btn-tab-main");
  }

  useEffect(() => {
    setMainTab(mobxStore.filterType);
  }, [mobxStore.filterType]);

  return (
    <div className="d-flex justify-content-left flex-wrap">
      <button className="btn-tab rounded-top-3" onClick={() => handleFilter("")} id="g1s52lVbKscc" title="All Types">
        <i className="bi bi-check2-all fs-5"></i>
      </button>
      {typeList?.map((key: TypeStruct) => (
          <button key={key.Name} onClick={() => handleFilter(key.Name)} className="btn-tab rounded-top-3" id={key.Name}>{key.Name}</button>
      ))}
    </div>
  )
}

export default BodyTabs
