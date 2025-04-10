import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { emptyItem, Item } from "../../functions/exports";
import mobxStore from "../../functions/store";
import ItemPageTopLine from "./ItemPageTopLine";
import EditItemForm from "../body/EditItemForm";
import UserCommandForm from "../body/UserCommandForm";
import LogsOutput from "../body/LogsOutput";

type ChildProps = {
  id: string;
};

const ItemPageMain: React.FC<ChildProps> = ({ id }) => {

  const navigate = useNavigate();
  const [item, setItem] = useState<Item>(emptyItem);

  useEffect(() => {
    mobxStore.itemList.map(i => {i.ID.toString() === id 
      ? setItem({...i})
      : ''});
  }, []);

  return (
    <>
    { item.Name !== "" ?
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
    </> : <></>}</>
  )
}

export default ItemPageMain

