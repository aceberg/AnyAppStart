import { useEffect } from "react";
import BodyAddItem from "./BodyAddItem";

let filterOption:string = "";

function BodyTabs(_props: any) {

  const grList = _props.grList;

  const handleFilter = (key: string) => {
    filterOption = key;
    localStorage.setItem('filter_field', "Group");
    localStorage.setItem('filter_option', filterOption);
    _props.setUpdBody(true);
    setMainTab(filterOption);
  };

  const handleAny = () => {
    filterOption = "";
    localStorage.setItem('filter_field', "Exec");
    localStorage.setItem('filter_option', filterOption);
    _props.setUpdBody(true);
    setMainTab(filterOption);
  };

  const setMainTab = (key: string) => {

    document.getElementById("g1s52lVbKscc")?.classList.remove("btn-tab-main");
    for (let i=0; i<grList.length; i++) {
      document.getElementById(grList[i])?.classList.remove("btn-tab-main");
    }
    key === "" ? key = "g1s52lVbKscc" : key = key;
    document.getElementById(key)?.classList.add("btn-tab-main");
  }

  useEffect(() => {
    filterOption = localStorage.getItem('filter_option') as string;
    setMainTab(filterOption);
  }, [filterOption]);

  return (
    <div className='d-flex justify-content-between'>
      <div className="d-flex justify-content-left">
        <button className="btn-tab rounded-top-3" onClick={handleAny} id="g1s52lVbKscc" title="All Groups">
          <i className="bi bi-check2-all fs-5 px-2"></i>
        </button>
        {grList?.map((key: string) => (
            <button key={key} onClick={() => handleFilter(key)} className="btn-tab rounded-top-3" id={key}>{key}</button>
        ))}
      </div>
      <BodyAddItem setUpdBody={_props.setUpdBody}></BodyAddItem>
    </div>
  )
}

export default BodyTabs
