import { useState } from "react";
import { apiExec } from "../functions/api";
import BootstrapModal from "./Modal";

function Logs(_props: any) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<string>("");

  const handleLogs = async () => {
    setModalOpen(true);
    let item = _props.item;
    item.Exec = "Logs";

    // console.log("LOGS:", item);
    const res = await apiExec(item);
    setLogs(res.Out);
    setLoading(false);
  }

  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <i className="bi bi-list-ul shade-hover fs-5" onClick={handleLogs} title="Logs"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title={"Logs: "+_props.item.Name}
        size="modal-xl"
        body={isLoading ? <pre>Loading logs for {_props.item.Name}...</pre> : <pre>{logs}</pre>}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Logs
