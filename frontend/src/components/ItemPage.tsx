import { useParams } from "react-router-dom";
import mobxStore from "../functions/store";

function ItemPage() {

  const params = useParams();
  const item = mobxStore.itemList.find(item => item.ID.toString() === params.id);
  console.log("ID:", item?.Name);

  return (
    <>
      Item Page
    </>
  )
}

export default ItemPage
