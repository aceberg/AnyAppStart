import { useEffect, useState } from "react";
import BootstrapModal from "./Modal";
import { getTypes, TypeStruct } from "../functions/api";

function TypesList() {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<TypeStruct[]>([]);

  const handleEdit = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
    
      setTypes(await getTypes());
    };
    
    fetchData();
  }, []);

  return (
    <>
      <a href="#" className="dropdown-item" onClick={handleEdit}>Types</a>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Types"
        size=""
        body={
          <>
          {types.map((t, i) => (
            <div key={i} className='d-flex justify-content-between shade-hover rounded-0'>
              <span className="p-2">{t.Name}</span>
              <i className="bi bi-x-lg shade-hover"></i>
            </div>
          ))}
          </>
        }
        onClose={handleCloseModal}
      />
    </>
  )
}

export default TypesList
