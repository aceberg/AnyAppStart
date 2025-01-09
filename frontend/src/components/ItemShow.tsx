import { apiExec } from "../functions/api";
import Logs from "./Logs";
import EditItem from "./EditItem";
import mobxStore from "../functions/store";

function ItemShow(_props: any) {

  const stateOn = "bi bi-circle-fill text-success";
  const stateOff = "bi bi-circle-fill text-danger";

  const handleExec = async (exec: string) => {
    let item = _props.item;
    item.Exec = exec;

    console.log("EXEC:", item);
    await apiExec(item);
    setTimeout(() => {
      mobxStore.setUpdBody(true);
    }, 1000);
  }

  return (
    <>
      <td><i className={_props.item.State == "on" ? stateOn : stateOff }></i></td>
      <td>{_props.item.Type}</td>
      <td>
        {_props.item.Icon
        ? <a href={_props.item.Link} target="_blank">
            <img src={_props.item.Icon} width={30} height={30}></img>
          </a>
        : <></>
        }
      </td>
      <td>
        {_props.item.Link
          ? <a href={_props.item.Link} target="_blank">{_props.item.Name}</a> 
          : _props.item.Name
        }
      </td>
      <td>{_props.item.Group}</td>
      <td>
        <i className="bi bi-play shade-hover me-1 fs-5" onClick={() => handleExec("Start")} title="Start"></i>
        <i className="bi bi-arrow-clockwise shade-hover me-1 fs-5" onClick={() => handleExec("Restart")} title="Restart"></i>
        <i className="bi bi-stop shade-hover fs-5" onClick={() => handleExec("Stop")} title="Stop"></i>
      </td>
      <td>
        <Logs item={_props.item}></Logs>
      </td>
      <td>
        <EditItem item={_props.item} 
          btnContent={<i className="bi bi-three-dots-vertical shade-hover fs-5" title="Edit"></i>}>  
        </EditItem>
      </td>
    </>
  )
}

export default ItemShow
