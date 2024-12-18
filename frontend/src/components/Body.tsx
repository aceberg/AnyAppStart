import { useEffect, useState } from "react"
import { getItems, Item } from "../functions/api"
import ItemShow from "./ItemShow";

function Body() {

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    
      setItems(await getItems());
    };
    
    fetchData();
  }, []);

  return (
    <>
    <div className="container-lg mt-2">
      <table className="table">
        <tbody>
        {items.map((item) => (
          <tr key={item.DName}>
            <ItemShow item={item}></ItemShow>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Body

