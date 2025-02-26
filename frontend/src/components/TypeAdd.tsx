import { TypeStruct } from "../functions/exports"
import TypeEdit from "./TypeEdit"

function TypeAdd(_props:any) {

  const emptyType:TypeStruct = {
    Name: "",
    Start: "",
    Stop: "",
    Restart: "",
    Logs: "",
    State: "",
    CPU: "",
    Mem: "",
  }

  return (
    <>
      <TypeEdit typeItem={emptyType} setUpdTypes={_props.setUpdTypes}
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
