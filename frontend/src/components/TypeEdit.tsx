import { useState } from "react";
import BootstrapModal from "./Modal";
import { apiSaveType } from "../functions/api";
import { TypeStruct } from "../functions/exports";
import mobxStore from "../functions/store";

function TypeEdit(_props: any) {

  const oldType:TypeStruct = {
    Name: _props.typeItem.Name,
    Start: _props.typeItem.Start,
    Stop: _props.typeItem.Stop,
    Restart: _props.typeItem.Restart,
    Logs: _props.typeItem.Logs,
    State: _props.typeItem.State,
    CPU: _props.typeItem.CPU,
    Mem: _props.typeItem.Mem,
    SSH: _props.typeItem.SSH,
    AnyCom: _props.typeItem.AnyCom,
  };

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TypeStruct>(oldType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(oldType);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const saveChanges = async () => {
    if (JSON.stringify(formData) !== JSON.stringify(oldType)) {
      console.log("SAVE1:", oldType);
      console.log("SAVE2:", formData);
      await apiSaveType(oldType, formData);
      _props.setUpdTypes(true); 
      mobxStore.setUpdBody(true);
    }
  }

  const handleSave = () => {
    saveChanges();
    setModalOpen(false);
  }

  const handleDel = () => {
    let delData = formData;
    delData.Name = "";
    saveChanges();
    setModalOpen(false);
  }

  return (
    <>
      <span onClick={handleEdit}>{_props.btnContent}</span>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Add/Edit Type"
        size="modal-xl"
        body={
          <form>
            <label htmlFor="nid" className="form-label text-primary">Name</label>
            <input className="form-control mb-3" defaultValue={oldType.Name} id="nid" name="Name" onChange={handleChange} placeholder="Not empty string"></input>
            <p>Use variable <code>$ITEMNAME</code> in the commands below</p>
            <label htmlFor="sshid" className="form-label text-primary">SSH (optional)</label>
            <input className="form-control mb-3" defaultValue={oldType.SSH} id="sshid" name="SSH" onChange={handleChange} placeholder="ssh -i /data/AnyAppStart/priv_key -oUserKnownHostsFile=/data/AnyAppStart/known_hosts user@remote-host -f"></input>
            <label htmlFor="gid" className="form-label text-primary">Start</label>
            <input className="form-control mb-3" defaultValue={oldType.Start} id="gid" name="Start" onChange={handleChange} placeholder="docker start $ITEMNAME"></input>
            <label htmlFor="oid" className="form-label text-primary">Stop</label>
            <input className="form-control mb-3" defaultValue={oldType.Stop} id="oid" name="Stop" onChange={handleChange} placeholder="docker stop $ITEMNAME"></input>
            <label htmlFor="rid" className="form-label text-primary">Restart</label>
            <input className="form-control mb-3" defaultValue={oldType.Restart} id="rid" name="Restart" onChange={handleChange} placeholder="docker restart $ITEMNAME"></input>
            <label htmlFor="lid" className="form-label text-primary">Logs</label>
            <input className="form-control mb-3" defaultValue={oldType.Logs} id="lid" name="Logs" onChange={handleChange} placeholder="docker logs $ITEMNAME"></input>
            <label htmlFor="tid" className="form-label text-primary">State</label>
            <input className="form-control mb-3" defaultValue={oldType.State} id="tid" name="State" onChange={handleChange} placeholder="docker ps --filter status=running | grep $ITEMNAME"></input>
            <label htmlFor="cpuid" className="form-label text-primary">CPU</label>
            <input className="form-control mb-3" defaultValue={oldType.CPU} id="cpuid" name="CPU" onChange={handleChange} placeholder="docker stats --no-stream --format '{{ .CPUPerc }}' $ITEMNAME"></input>
            <label htmlFor="memid" className="form-label text-primary">Mem</label>
            <input className="form-control mb-3" defaultValue={oldType.Mem} id="memid" name="Mem" onChange={handleChange} placeholder="docker stats --no-stream --format '{{ .MemUsage }}' $ITEMNAME | awk '{print $1}'"></input>
            <label htmlFor="anyid" className="form-label text-primary">User defined command (AnyCom)</label>
            <input className="form-control mb-3" defaultValue={oldType.AnyCom} id="anyid" name="AnyCom" onChange={handleChange}></input>
            <hr></hr>
            <div className='d-flex justify-content-between'>
              <button className="btn btn-danger" type="button" onClick={handleDel}>Delete</button>
              <button className="btn btn-primary" type="button" onClick={handleSave}>Save</button>
            </div>
          </form>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default TypeEdit;

