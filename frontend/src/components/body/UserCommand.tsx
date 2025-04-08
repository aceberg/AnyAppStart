import { useState } from "react";
import BootstrapModal from "./../Modal";
import UserCommandForm from "./UserCommandForm";

function UserCommand(_props: any) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => setModalOpen(false);

  const handleOpenModal = () => setModalOpen(true);

  return (
    <>
      <i className="bi bi-emoji-smile shade-hover fs-5" 
        onClick={handleOpenModal}
        title="User defined command"></i>
      <BootstrapModal
        isOpen={isModalOpen}
        title={"Command for: "+_props.item.Name+", Type: "+_props.item.Type}
        size="modal-xl"
        body={<UserCommandForm item={_props.item}></UserCommandForm>}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default UserCommand
