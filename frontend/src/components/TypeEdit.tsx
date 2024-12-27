import { useState } from "react";
import BootstrapModal from "./Modal";
import { apiSaveType, TypeStruct } from "../functions/api";

function TypeEdit(_props: any) {

  const addType:TypeStruct = {
    Name: _props.item.Name,
    Start: _props.item.Start,
    Stop: _props.item.Stop,
    Restart: _props.item.Restart,
    Logs: _props.item.Logs,
    State: _props.item.State,
  };  

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TypeStruct>(addType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const handleEdit = () => {
    setModalOpen(true);
  }

  const handleCloseModal = async () => {
    if (JSON.stringify(formData) !== JSON.stringify(addType)) {
      console.log("SAVE:", formData);
      await apiSaveType(addType, formData);
    }
    _props.updTypes(true);
    setModalOpen(false);
  }

  return (
    <>
      <span onClick={handleEdit}>{_props.btnContent}</span>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Edit Type"
        size="modal-lg"
        body={
          <form id="form-type">
            <label htmlFor="nid" className="form-label text-primary">Name (leave blank to delete Type)</label>
            <input className="form-control mb-3" defaultValue={addType.Name} id="nid" name="Name" onChange={handleChange}></input>
            <label htmlFor="gid" className="form-label text-primary">Start</label>
            <input className="form-control mb-3" defaultValue={addType.Start} id="gid" name="Start" onChange={handleChange}></input>
            <label htmlFor="oid" className="form-label text-primary">Stop</label>
            <input className="form-control mb-3" defaultValue={addType.Stop} id="oid" name="Stop" onChange={handleChange}></input>
            <label htmlFor="rid" className="form-label text-primary">Restart</label>
            <input className="form-control mb-3" defaultValue={addType.Restart} id="rid" name="Restart" onChange={handleChange}></input>
            <label htmlFor="lid" className="form-label text-primary">Logs</label>
            <input className="form-control mb-3" defaultValue={addType.Logs} id="lid" name="Logs" onChange={handleChange}></input>
            <label htmlFor="tid" className="form-label text-primary">State</label>
            <input className="form-control mb-3" defaultValue={addType.State} id="tid" name="State" onChange={handleChange}></input>
          </form>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default TypeEdit
