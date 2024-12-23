import { useState } from "react";
import BootstrapModal from "./Modal";

function ConfigAbout() {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <a href="#" className="dropdown-item" onClick={handleEdit}>About</a>
      <BootstrapModal
        isOpen={isModalOpen}
        title="About"
        size=""
        body={
          <p>About</p>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default ConfigAbout
