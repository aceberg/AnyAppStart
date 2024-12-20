import { useState } from "react";
import BootstrapModal from "./Modal";
import { apiSaveItem, Item } from "../functions/api";

function EditItem(_props: any) {

  const item:Item = {
    Group: _props.item.Group,
    Name: _props.item.Name,
    Type: _props.item.Type,
    Exec: ""
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

  const handleCloseModal = async () => {
    if (JSON.stringify(formData) !== JSON.stringify(item)) {
      await apiSaveItem(item, formData);
      console.log("SAVE:", formData);
      _props.bodyUpd(true);
    }
    setModalOpen(false);
  }

  return (
    <>
      <i className="bi bi-three-dots-vertical shade-hover" onClick={handleEdit} title="Edit"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Edit Item"
        size=""
        body={
          <form>
            <label htmlFor="gid" className="form-label text-primary">Group</label>
            <input className="form-control mb-3" defaultValue={item.Group} id="gid" name="Group" onChange={handleChange}></input>
            <label htmlFor="nid" className="form-label text-primary">Name (leave blank to delete item)</label>
            <input className="form-control mb-3" defaultValue={item.Name} id="nid" name="Name" onChange={handleChange}></input>
            <label htmlFor="tid" className="form-label text-primary">Type</label>
            <input className="form-control mb-3" defaultValue={item.Type} id="tid" name="Type" onChange={handleChange}></input>
          </form>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default EditItem
