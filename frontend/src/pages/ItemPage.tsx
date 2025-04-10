import { useParams } from "react-router-dom";
import ItemPageMain from "../components/ItemPage/ItemPageMain";

function ItemPage() {

  const params = useParams();

  return (
    <>
      <ItemPageMain id={params.id ? params.id : ''}></ItemPageMain>
    </>
  )
}

export default ItemPage

