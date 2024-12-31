import { useState } from "react";
import BootstrapModal from "./Modal";
import { apiSaveItem, Item } from "../functions/api";

function EditItem(_props: any) {

  const item:Item = {
    Group: _props.item.Group,
    Name: _props.item.Name,
    Type: _props.item.Type,
    Exec: "",
    State: ""
  };

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Item>(item);

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

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const saveChanges = async () => {
    if (JSON.stringify(formData) !== JSON.stringify(item)) {
      await apiSaveItem(item, formData);
      console.log("SAVE:", formData);
      _props.setUpdBody(true);
    }
  }
  
  const handleSave = () => {
    saveChanges();
    setModalOpen(false);
  }

  const handleDel = () => {
    let delData = formData;
    delData.Name = "";
    setFormData(delData);
    saveChanges();
    setModalOpen(false);
  }

  return (
    <>
      <span onClick={handleEdit}>{_props.btnContent}</span>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Edit Item"
        size=""
        body={
          <form>
            <label htmlFor="gid" className="form-label text-primary">Group</label>
            <input className="form-control mb-3" defaultValue={item.Group} id="gid" name="Group" onChange={handleChange}></input>
            <label htmlFor="nid" className="form-label text-primary">Name</label>
            <input className="form-control mb-3" defaultValue={item.Name} id="nid" name="Name" onChange={handleChange}></input>
            <label htmlFor="tid" className="form-label text-primary">Type</label>
            <input className="form-control mb-3" defaultValue={item.Type} id="tid" name="Type" onChange={handleChange}></input>
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

export default EditItem
