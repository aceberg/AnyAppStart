import { useState } from "react";
import BootstrapModal from "./Modal";
import { apiSaveItem } from "../functions/api";
import mobxStore from "../functions/store";
import { Item } from "../functions/exports";
import { fetchItems } from "../functions/updstate";

function EditItem(_props: any) {

  const item:Item = {
    ID: _props.item.ID,
    Group: _props.item.Group,
    Name: _props.item.Name,
    Type: _props.item.Type,
    Link: _props.item.Link,
    Icon: _props.item.Icon,
    Exec: "",
    State: "",
    CPU: "",
    Mem: "",
    AnyCom: "",
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
    setFormData(item);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const saveChanges = async () => {
    if (JSON.stringify(formData) !== JSON.stringify(item)) {
      await apiSaveItem(item, formData);
      
      setTimeout(() => {
        fetchItems();
      }, 1000);
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

  const handleSelectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      Type: event.target.value,
    }));
  };

  return (
    <>
      <span onClick={handleEdit}>{_props.btnContent}</span>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Add/Edit Item"
        size=""
        body={
          <form>
            <label htmlFor="gid" className="form-label text-primary">Group</label>
            <input className="form-control mb-3" defaultValue={item.Group} id="gid" name="Group" onChange={handleChange} placeholder="Not empty string"></input>
            <label htmlFor="nid" className="form-label text-primary">Name</label>
            <input className="form-control mb-3" defaultValue={item.Name} id="nid" name="Name" onChange={handleChange} placeholder="Not empty string"></input>
            <label htmlFor="tid" className="form-label text-primary">Type</label>
            <select className="form-select mb-3" id="tid" onChange={handleSelectType} defaultValue={formData.Type}>
              <option value="" disabled>Select type</option>
              {mobxStore.typeList?.map((t, i) => (
                <option key={i} value={t.Name}>{t.Name}</option>
              ))}
            </select>
            <label htmlFor="iid" className="form-label text-primary">Icon</label>
            <input className="form-control mb-3" defaultValue={item.Icon} id="iid" name="Icon" onChange={handleChange} placeholder="Link to Icon (optional)"></input>
            <label htmlFor="lid" className="form-label text-primary">Link</label>
            <input className="form-control mb-3" defaultValue={item.Link} id="lid" name="Link" onChange={handleChange} placeholder="URL (optional)"></input>
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
