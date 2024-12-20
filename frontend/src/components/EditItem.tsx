import { useState } from "react";
import BootstrapModal from "./Modal";

function EditItem(_props: any) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => setModalOpen(false);

  const handleSave = () => {
    
    console.log("SAVE:", _props.item);
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
            <input className="form-control mb-3" defaultValue={_props.item.Group} id="gid"></input>
            <label htmlFor="nid" className="form-label text-primary">Name</label>
            <input className="form-control mb-3" defaultValue={_props.item.Name} id="nid"></input>
            <label htmlFor="tid" className="form-label text-primary">Type</label>
            <input className="form-control mb-3" defaultValue={_props.item.Type} id="tid"></input>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
          </form>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default EditItem
