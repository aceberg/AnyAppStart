import { useState } from "react";

import BootstrapModal from "./Modal";
import EditItemForm from "./EditItemForm";

function EditItem(_props: any) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <span onClick={handleEdit}>{_props.btnContent}</span>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Add/Edit Item"
        size=""
        body={<EditItemForm 
          item={_props.item}
          onDelete={handleCloseModal}
          onSave={handleCloseModal}
        ></EditItemForm>}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default EditItem
