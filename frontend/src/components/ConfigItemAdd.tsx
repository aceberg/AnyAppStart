import { useEffect, useState } from "react";
import { Item } from "../functions/api";
import EditItem from "./EditItem"


function ConfigItemAdd() {

  const item:Item = {
    Group: "",
    Name: "",
    Type: "",
    Exec: ""
  };

  const [updAll, setUpdAll] = useState<boolean>(false);

  useEffect(() => {
    // window.location.reload();
    setUpdAll(false);
  }, [updAll]);

  return (
    <>
      <EditItem item={item} bodyUpd={setUpdAll} 
          btnContent={<a href="#" className="dropdown-item">Add Item</a>}>
      </EditItem>
    </>
  )
}

export default ConfigItemAdd
