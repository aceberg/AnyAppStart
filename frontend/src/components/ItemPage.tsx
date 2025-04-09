import { useNavigate, useParams } from "react-router-dom";
import mobxStore from "../functions/store";
import EditItemForm from "./body/EditItemForm";
import UserCommandForm from "./body/UserCommandForm";
import LogsOutput from "./body/LogsOutput";
import { Item } from "../functions/exports";
import ItemPageTopLine from "./ItemPageTopLine";

function ItemPage() {

  const params = useParams();
  const navigate = useNavigate();

  const item = mobxStore.itemList.find(i => i.ID.toString() === params.id) as Item;
  console.log("ID:", item.Name);

  return (
    <>
    <ItemPageTopLine item={item} goBack={() => navigate("/")} />
    <div className="row">
      <div className="col-md mt-4">
      <div className="card border-primary">
        <div className="card-header">Item</div>
        <div className="card-body">
          <EditItemForm item={item} onSave={() => navigate("/")} 
            onDelete={() => navigate("/")} />
        </div>
      </div>
      </div>
      <div className="col-md mt-4">
        <div className="card border-primary">
          <div className="card-header">Run any command</div>
          <div className="card-body">
            <UserCommandForm item={item} />
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-md">
        <div className="card border-primary">
          <div className="card-header">Logs</div>
          <div className="card-body">
            <LogsOutput item={item} height="500px" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ItemPage

