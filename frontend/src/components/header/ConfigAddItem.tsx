import { Item } from "../../functions/exports";
import EditItem from "../body/EditItem"


function ConfigAddItem() {

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
    AnyCom: "",
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
