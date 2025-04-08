import { useNavigate, useParams } from "react-router-dom";
import mobxStore from "../functions/store";
import EditItemForm from "./body/EditItemForm";
import UserCommandForm from "./body/UserCommandForm";
import LogsOutput from "./body/LogsOutput";

function ItemPage() {

  const navigate = useNavigate();

  const params = useParams();
  const item = mobxStore.itemList.find(item => item.ID.toString() === params.id);
  console.log("ID:", item?.Name);

  return (
    <>
    <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
      <i className="bi bi-arrow-90deg-left"></i>&nbsp;&nbsp;Back
    </button>
    <div className="row mt-2">
      <div className="col-md">
      <div className="card border-primary">
        <div className="card-header">Item</div>
        <div className="card-body">
          <EditItemForm item={item} onSave={() => void 0} 
            onDelete={() => navigate("/")} />
        </div>
      </div>
      </div>
      <div className="col-md">
        <div className="card border-primary">
          <div className="card-header">Run any command</div>
          <div className="card-body">
            <UserCommandForm item={item} />
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-md">
        <div className="card border-primary">
          <div className="card-header">Logs</div>
          <div className="card-body">
            <LogsOutput item={item} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ItemPage

