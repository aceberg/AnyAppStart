import { useState } from "react";
import { apiExec } from "../functions/api";
import BootstrapModal from "./Modal";

function Logs(_props: any) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [logs, setLogs] = useState<string>("");

  const handleLogs = async () => {
    let item = _props.item;
    item.Exec = "Logs";

    console.log("LOGS:", item);
    const res = await apiExec(item);
    setLogs(res.Out);
    setModalOpen(true);
  }

  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <i className="bi bi-list-ul shade-hover" onClick={handleLogs} title="Logs"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Logs"
        size="modal-xl"
        body={<pre>{logs}</pre>}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Logs
