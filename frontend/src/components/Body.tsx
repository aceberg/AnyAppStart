import { useEffect, useState } from "react"
import { getItems, Item } from "../functions/api"
import ItemShow from "./ItemShow";

function Body() {

  const [items, setItems] = useState<Item[]>([]);
  const [updBody, setUpdBody] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
    
      setItems(await getItems());
    };
    
    fetchData();
    setUpdBody(false);
  }, [updBody]);

  return (
    <>
    <div className="container-lg mt-2">
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Group</th>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
            <th>Logs</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <ItemShow item={item} bodyUpd={setUpdBody}></ItemShow>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Body

