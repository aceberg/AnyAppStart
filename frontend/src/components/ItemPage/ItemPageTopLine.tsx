import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { apiExec } from "../../functions/api";
import { updItemState } from "../../functions/updstate";
import { Item } from "../../functions/exports";

type ChildProps = {
  item: Item;
  goBack: () => void | Promise<void>
};

const ItemPageTopLine: React.FC<ChildProps> = ({ item, goBack }) => {

  const stateOn = "bi bi-circle-fill text-success";
  const stateOff = "bi bi-circle-fill text-danger";

  const [itemState, setItemState] = useState(item.State);
  const [itemCPU, setItemCPU] = useState(item.CPU);
  const [itemMem, setItemMem] = useState(item.Mem);
  let interval: NodeJS.Timeout;


  const handleExec = async (exec: string) => {
    item.Exec = exec;

    const res = await apiExec(item);
    if (res.Ok) {
      toast('"'+ exec +'" executed on "'+ item.Name +'"', {
        style: {
          borderRadius: '10px',
          background: '#000',
          color: '#fff',
        },
      });
    }
    setTimeout(() => {
      updateItem();
    }, 1000);
  }

  const updateItem = async () => {
    const i = await updItemState(item);
    setItemState(i.State);
    setItemCPU(i.CPU);
    setItemMem(i.Mem);
  }

  useEffect(() => {
      updateItem();
  
      interval = setInterval(() => {
        console.log("Update State for ", item.Name);
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
        <button className="btn btn-outline-primary" onClick={goBack}>
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

