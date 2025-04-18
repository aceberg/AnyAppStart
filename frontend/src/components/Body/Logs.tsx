import { useState } from "react";

import BootstrapModal from "../All/Modal";
import LogsOutput from "../All/LogsOutput";

function Logs(_props: any) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <i className="bi bi-list-ul shade-hover fs-5" onClick={() => setModalOpen(true)} title="Logs"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title={"Logs: "+_props.item.Name}
        size="modal-xl"
        body={<LogsOutput item={_props.item} height="80vh"></LogsOutput>}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

export default Logs
