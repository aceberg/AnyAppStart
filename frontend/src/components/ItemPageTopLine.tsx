import { apiExec } from "../functions/api";
import toast, { Toaster } from "react-hot-toast";
import { updItemState } from "../functions/updstate";
import { useEffect, useState } from "react";

function ItemPageTopLine(_props: any) {

  const stateOn = "bi bi-circle-fill text-success";
  const stateOff = "bi bi-circle-fill text-danger";

  const [itemState, setItemState] = useState(_props.item.State);
  const [itemCPU, setItemCPU] = useState(_props.item.CPU);
  const [itemMem, setItemMem] = useState(_props.item.Mem);
  let interval: NodeJS.Timeout;


  const handleExec = async (exec: string) => {
    _props.item.Exec = exec;

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
    updateItem();
  }

  const updateItem = async () => {
    const i = await updItemState(_props.item);
    setItemState(i.State);
    setItemCPU(i.CPU);
    setItemMem(i.Mem);
  }

  useEffect(() => {
      updateItem();
  
      interval = setInterval(() => {
        console.log("Update State for ", _props.item.Name);
        updateItem();
      }, 10000); // 10000 ms = 10 s
      
      return () => {
        clearInterval(interval);
      }
  }, []);

  return (
    <>
    <Toaster position="top-center"/>
    <div className="row text-center mt-2">
      <div className="col-md d-flex justify-content-start">
        <button className="btn btn-outline-primary" onClick={_props.goBack}>
          <i className="bi bi-arrow-90deg-left"></i>&nbsp;&nbsp;Back
        </button>
      </div>
      <div className="col-md">
        <div className="card border-primary p-2">
          <div className="d-flex justify-content-between mx-2">
          <i className={itemState == "on" ? stateOn : stateOff }></i>
          <b>CPU:</b> {itemCPU}
          <b>Mem:</b> {itemMem}
          </div>
        </div>
      </div>
      <div className="col-md input-group d-flex justify-content-end">
        <button className="btn btn-outline-primary" onClick={() => handleExec("Start")}>
          <i className="bi bi-play"></i>&nbsp;&nbsp;Start
        </button>
        <button className="btn btn-outline-primary" onClick={() => handleExec("Restart")}>
          <i className="bi bi-arrow-clockwise"></i>&nbsp;&nbsp;Restart
        </button>
        <button className="btn btn-outline-primary" onClick={() => handleExec("Stop")}>
          <i className="bi bi-stop"></i>&nbsp;&nbsp;Stop
        </button>
      </div>
    </div>
    </>
  )
}

export default ItemPageTopLine

