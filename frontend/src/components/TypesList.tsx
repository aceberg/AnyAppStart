import { useEffect, useState } from "react";
import BootstrapModal from "./Modal";
import { getTypes, TypeStruct } from "../functions/api";
import TypeEdit from "./TypeEdit";

function TypesList() {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<TypeStruct[]>([]);

  const handleOpen = () => {
    setModalOpen(true);
  }

  const handleDelete = (type: TypeStruct) => {
    console.log("DEL TYPE", type)
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
      <a href="#" className="dropdown-item" onClick={handleOpen}>Types</a>
      <BootstrapModal
        isOpen={isModalOpen}
        title="Types"
        size=""
        body={
          <>
          {types.map((t, i) => (
            <div key={i} className='d-flex justify-content-between shade-hover rounded-0'>
              <TypeEdit item={t}
                btnContent={<span className="shade-hover p-2" title="Edit">{t.Name}</span>}>
              </TypeEdit>
              <i className="bi bi-x-lg shade-hover" onClick={() => handleDelete(t)} title="Delete"></i>
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
