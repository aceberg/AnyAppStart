import { TypeStruct } from "../../functions/exports"
import TypeEdit from "./TypeEdit"

function TypeAdd() {

  const emptyType:TypeStruct = {
    Name: "",
    Start: "",
    Stop: "",
    Restart: "",
    Logs: "",
    State: "",
    CPU: "",
    Mem: "",
    SSH: "",
    AnyCom: "",
  }

  return (
    <>
      <TypeEdit typeItem={emptyType}
        btnContent={
          <a href="#" className="dropdown-item">
            Add Type
          </a>
        }>
      </TypeEdit>
    </>
  )
}

export default TypeAdd
