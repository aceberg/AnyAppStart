import { emptyItem } from "../../functions/exports";
import EditItem from "../body/EditItem"


function ConfigAddItem() {

  return (
    <>
      <EditItem item={emptyItem}
          btnContent={<a href="#" className="dropdown-item">Add Item</a>}>
      </EditItem>
    </>
  )
}

export default ConfigAddItem
