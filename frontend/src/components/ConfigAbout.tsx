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
          <>
            <p>About: <a href="https://github.com/aceberg/AnyAppStart" target="_blank">https://github.com/aceberg/AnyAppStart</a></p>
            <p>Donate: <a href="https://github.com/aceberg#donate" target="_blank">https://github.com/aceberg#donate</a></p>
          </>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default ConfigAbout
