import { Item } from "../functions/exports";
import EditItem from "./EditItem"


function ConfigAddItem(_props: any) {

  const item:Item = {
    ID: 0,
    Group: "",
    Name: "",
    Type: "",
    Link: "",
    Icon: "",
    State: "",
    Exec: "",
    CPU: "",
    Mem: "",
  };

  return (
    <>
      <EditItem item={item}
          btnContent={<a href="#" className="dropdown-item">Add Item</a>}>
      </EditItem>
    </>
  )
}

export default ConfigAddItem
