import { useState } from "react";
import { apiExec } from "../functions/api";
import State from "./State";
import Logs from "./Logs";
import EditItem from "./EditItem";

function ItemShow(_props: any) {

  const [upd, setUpd] = useState(1);

  const handleExec = async (exec: string) => {
    let item = _props.item;
    item.Exec = exec;

    console.log("EXEC:", item);
    await apiExec(item);
    setTimeout(() => {
      setUpd(-upd);
    }, 1000);
  }

  return (
    <>
      <td><State item={_props.item} upd={upd}></State></td>
      <td>{_props.item.Group}</td>
      <td>{_props.item.Name}</td>
      <td>{_props.item.Type}</td>
      <td>
        <i className="bi bi-play shade-hover" onClick={() => handleExec("Start")} title="Start"></i>
        <i className="bi bi-arrow-clockwise shade-hover" onClick={() => handleExec("Restart")} title="Restart"></i>
        <i className="bi bi-stop shade-hover" onClick={() => handleExec("Stop")} title="Stop"></i>
        <Logs item={_props.item}></Logs>
      </td>
      <td>
        <EditItem item={_props.item} bodyUpd={_props.bodyUpd} 
          btnContent={<i className="bi bi-three-dots-vertical shade-hover" title="Edit"></i>}>  
        </EditItem>
      </td>
    </>
  )
}

export default ItemShow
