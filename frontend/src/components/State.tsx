import { useEffect, useState } from "react";
import { apiExec } from "../functions/api";

function State(_props: any) {

  const [state, setState] = useState("bi bi-circle-fill text-danger");

  const fetchData = async () => {
    let item = _props.item;
    item.Exec = "State";
    const data = await apiExec(item);
    if (data.Ok) {
      setState("bi bi-circle-fill text-success");
    } else {
      setState("bi bi-circle-fill text-danger");
    }
  };

  useEffect(() => { // Update on trigger
    fetchData();
  }, [_props.upd]);

  useEffect(() => { // Regular update
    setInterval(() => {
      fetchData();
    }, 60000); // 60000 ms = 1 minute
  }, []);

  return (
    <>
      <i className={state}></i>
    </>
  )
}

export default State
