import { useEffect, useState } from "react";
import BootstrapModal from "./Modal";
import { apiSaveType, getTypes, TypeStruct } from "../functions/api";
import TypeEdit from "./TypeEdit";

function TypesList() {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<TypeStruct[]>([]);
  const [updTypes, setUpdTypes] = useState<boolean>(false);

  const handleOpen = () => {
    setModalOpen(true);
  }

  const handleDelete = async (type: TypeStruct) => {
    console.log("DEL TYPE", type);

    let newType:TypeStruct = {
      Name: "",
      Start: "",
      Stop: "",
      Restart: "",
      Logs: "",
      State: ""
    };
    
    await apiSaveType(type, newType);
    setUpdTypes(true);
  }

  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
    
      setTypes(await getTypes());
    };
    
    fetchData();
    setUpdTypes(false);
  }, [updTypes]);

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
            <div key={i} className='d-flex justify-content-between'>
              <div className="mt-2">
                <TypeEdit item={t} updTypes={setUpdTypes}
                  btnContent={<span className="shade-hover p-2" title="Edit">{t.Name}</span>}>
                </TypeEdit>
              </div>
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
