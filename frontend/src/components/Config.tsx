import { useState } from "react";
import BootstrapModal from "./Modal";
import { appConfig, Conf } from "../functions/api";

function Config() {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Conf>(appConfig);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(appConfig);
    setModalOpen(true);
  }

  const handleCloseModal = async () => {
    if (JSON.stringify(formData) !== JSON.stringify(appConfig)) {
      // await apiSaveItem(item, formData);
      console.log("SAVE:", formData);
    }
    setModalOpen(false);
  }

  return (
    <>
      <i className="bi bi-gear shade-hover fs-3 text-primary" title="Settings" onClick={handleEdit}></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Config"
        size=""
        body={
          <form>
            <label htmlFor="gid" className="form-label text-primary">Theme</label>
            <input className="form-control mb-3" defaultValue={appConfig.Theme} id="gid" name="Theme" onChange={handleChange}></input>
            <label htmlFor="nid" className="form-label text-primary">Color</label>
            <input className="form-control mb-3" defaultValue={appConfig.Color} id="nid" name="Color" onChange={handleChange}></input>
            <label htmlFor="tid" className="form-label text-primary">NodePath</label>
            <input className="form-control mb-3" defaultValue={appConfig.NodePath} id="tid" name="NodePath" onChange={handleChange}></input>
          </form>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Config
