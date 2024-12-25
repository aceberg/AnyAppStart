import TypeEdit from "./TypeEdit"
import { TypeStruct } from "../functions/api";


function TypeAdd() {

  const newType:TypeStruct = {
    Name: "",
    Start: "",
    Stop: "",
    Restart: "",
    Logs: "",
    State: "",
  };

  return (
    <>
      <TypeEdit item={newType}
          btnContent={<a href="#" className="dropdown-item">Add Type</a>}>
      </TypeEdit>
    </>
  )
}

export default TypeAdd
