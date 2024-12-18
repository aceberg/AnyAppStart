import { apiExec } from "../functions/api";

function ItemShow(_props: any) {

  const handleExec = (exec: string) => {
    let item = _props.item;
    item.Exec = exec;

    console.log("EXEC:", item);
    apiExec(item);
  }

  return (
    <>
      <td>{_props.item.Group}</td>
      <td>{_props.item.Name}</td>
      <td>{_props.item.Type}</td>
      <td>
        <i className="bi bi-play shade-hover" onClick={() => handleExec("Start")}></i>
        <i className="bi bi-stop shade-hover" onClick={() => handleExec("Stop")}></i>
        <i className="bi bi-arrow-clockwise shade-hover" onClick={() => handleExec("Restart")}></i>
        <i className="bi bi-list-ul shade-hover" onClick={() => handleExec("Logs")}></i>
      </td>
      <td>
        <i className="bi bi-three-dots-vertical shade-hover"></i>
      </td>
    </>
  )
}

export default ItemShow
