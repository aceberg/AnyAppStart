import { Item } from "../functions/exports";
import EditItem from "./EditItem"


function BodyAddItem(_props: any) {

  const item:Item = {
    Group: "",
    Name: "",
    Type: "",
    Link: "",
    Icon: "",
    State: "",
    Exec: ""
  };

  return (
    <>
      <EditItem item={item} setUpdBody={_props.setUpdBody}
          btnContent={<button className="btn btn-outline-primary">Add Item</button>}>
      </EditItem>
    </>
  )
}

export default BodyAddItem
