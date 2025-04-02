import { useState } from "react";
import { apiExecAny } from "../functions/api";
import BootstrapModal from "./Modal";

function UserCommand(_props: any) {

  const [anyCommand, setAnyCommand] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [logs, setLogs] = useState<string>("");
  const [result, setResult] = useState(<></>);

  const handleRun = async () => {
    setResult(<div className="text-info">Running...</div>);
    setLogs("");

    const res = await apiExecAny(_props.item, anyCommand);
    if (!res.Ok) {
      setResult(<div className="text-danger">Error</div>);
      setLogs(res.Out);
    } else {
      setResult(<div className="text-success">Success</div>);
      setLogs(res.Out);
    }
  }

  const handleCloseModal = () => setModalOpen(false);

  const handleOpenModal = () => {
    setLogs("");
    setResult(<></>);

    setAnyCommand(_props.item.AnyCom);
    setModalOpen(true);
  };

  return (
    <>
      <i className="bi bi-emoji-smile shade-hover fs-5" 
        onClick={handleOpenModal}
        title="User defined command"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title={"Command for: "+_props.item.Name+", Type: "+_props.item.Type}
        size="modal-xl"
        body={<>
          <div className="input-group mb-4">
            <input type="text" className="form-control" 
              defaultValue={anyCommand}
              onChange={(e) => setAnyCommand(e.target.value)} 
              onKeyUp={(e) => {e.key === "Enter" ? handleRun() : {}}}></input>
            <button type="submit" className="btn btn-outline-primary" 
              onClick={handleRun}>Run</button>
          </div>
          <hr></hr>
          {result}
          <hr></hr>
          <pre>{logs}</pre>
        </>}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default UserCommand
