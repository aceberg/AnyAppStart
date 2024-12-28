import { useEffect, useState } from "react"
import { getItems, Item } from "../functions/api"
import ItemShow from "./ItemShow";
import { sortItems } from "../functions/sortitems";

function Body() {

  const [items, setItems] = useState<Item[]>([]);
  const [updBody, setUpdBody] = useState<boolean>(false);
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleSort = (sortby:keyof Item) => {
    setSortAsc(!sortAsc);
    setItems(sortItems(items, sortby, sortAsc));
    console.log("SORT BY", sortby, sortAsc);
  }

  const fetchData = async () => {
    
    setItems(await getItems());
    console.log("FETCHING ITEMS", new Date());
  };

  useEffect(() => {
    fetchData();
    setUpdBody(false);
  }, [updBody]);

  useEffect(() => { // Regular update
    setInterval(() => {
      fetchData();
    }, 60000); // 60000 ms = 1 minute
  }, []);

  return (
    <>
    <div className="container-lg mt-2">
      <div className="card border-primary">
        {/* <div className="card-header">
          <span>Header</span>
        </div> */}
        <div className="card-body table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: "1%" }}></th>
                <th>State<i onClick={() => handleSort("State")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>Group<i onClick={() => handleSort("Group")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>Name<i onClick={() => handleSort("Name")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>Type<i onClick={() => handleSort("Type")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>Action</th>
                <th>Logs</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {items?.map((item, i) => (
              <tr key={i}>
                <td className="text-primary text-opacity-75">{i}.</td>
                <ItemShow item={item} setUpdBody={setUpdBody}></ItemShow>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Body

