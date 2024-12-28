import { apiExec } from "../functions/api";
import Logs from "./Logs";
import EditItem from "./EditItem";

function ItemShow(_props: any) {

  const stateOn = "bi bi-circle-fill text-success";
  const stateOff = "bi bi-circle-fill text-danger";

  const handleExec = async (exec: string) => {
    let item = _props.item;
    item.Exec = exec;

    console.log("EXEC:", item);
    await apiExec(item);
    setTimeout(() => {
      _props.setUpdBody(true);
    }, 1000);
  }

  return (
    <>
      <td><i className={_props.item.State == "on" ? stateOn : stateOff }></i></td>
      <td>{_props.item.Group}</td>
      <td>{_props.item.Name}</td>
      <td>{_props.item.Type}</td>
      <td>
        <i className="bi bi-play shade-hover" onClick={() => handleExec("Start")} title="Start"></i>
        <i className="bi bi-arrow-clockwise shade-hover" onClick={() => handleExec("Restart")} title="Restart"></i>
        <i className="bi bi-stop shade-hover" onClick={() => handleExec("Stop")} title="Stop"></i>
      </td>
      <td>
        <Logs item={_props.item}></Logs>
      </td>
      <td>
        <EditItem item={_props.item} setUpdBody={_props.setUpdBody} 
          btnContent={<i className="bi bi-three-dots-vertical shade-hover" title="Edit"></i>}>  
        </EditItem>
      </td>
    </>
  )
}

export default ItemShow
