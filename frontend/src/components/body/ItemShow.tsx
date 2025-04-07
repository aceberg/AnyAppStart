import { apiExec } from "../../functions/api";
import Logs from "./Logs";
import EditItem from "./EditItem";
import { updItemState } from "../../functions/updstate";
import toast, { Toaster } from 'react-hot-toast';
import UserCommand from "./UserCommand";

function ItemShow(_props: any) {

  const handleExec = async (exec: string) => {
    _props.item.Exec = exec;

    // console.log("EXEC:", _props.item);
    const res = await apiExec(_props.item);
    if (res.Ok) {
      toast('"'+ exec +'" executed on "'+ _props.item.Name +'"', {
        style: {
          borderRadius: '10px',
          background: '#000',
          color: '#fff',
        },
      });
    }
    setTimeout(() => {
      updItemState(_props.item);
    }, 1000);
  }

  return (
    <>
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
      <td onClick={() => _props.handleNavigate(_props.item)}>{_props.item.Type}<Toaster position="top-center"/></td>
      <td onClick={() => _props.handleNavigate(_props.item)}>{_props.item.Group}</td>
      <td>
        <i className="bi bi-play shade-hover me-1 fs-5" onClick={() => handleExec("Start")} title="Start"></i>
        <i className="bi bi-arrow-clockwise shade-hover me-1 fs-5" onClick={() => handleExec("Restart")} title="Restart"></i>
        <i className="bi bi-stop shade-hover fs-5" onClick={() => handleExec("Stop")} title="Stop"></i>
        <UserCommand item={_props.item}></UserCommand>
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

