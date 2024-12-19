import { apiExec } from "../functions/api";

function ItemShow(_props: any) {

  const handleExec = (exec: string) => {
    let item = _props.item;
    item.Exec = exec;

    console.log("EXEC:", item);
    apiExec(item);
  }

  const handleEdit = () => {
    console.log("EDIT", _props.item);
  }

  const renderState = () => {
    if (_props.item.State == "on") {
        return <i className="bi bi-circle-fill text-success"></i>;
    } else {
        return <i className="bi bi-circle-fill text-danger"></i>;
    }
  };

  return (
    <>
      <td>{renderState()}</td>
      <td>{_props.item.Group}</td>
      <td>{_props.item.Name}</td>
      <td>{_props.item.Type}</td>
      <td>
        <i className="bi bi-play shade-hover" onClick={() => handleExec("Start")} title="Start"></i>
        <i className="bi bi-arrow-clockwise shade-hover" onClick={() => handleExec("Restart")} title="Restart"></i>
        <i className="bi bi-stop shade-hover" onClick={() => handleExec("Stop")} title="Stop"></i>
        <i className="bi bi-list-ul shade-hover" onClick={() => handleExec("Logs")} title="Logs"></i>
      </td>
      <td>
        <i className="bi bi-three-dots-vertical shade-hover" onClick={handleEdit} title="Edit"></i>
      </td>
    </>
  )
}

export default ItemShow
