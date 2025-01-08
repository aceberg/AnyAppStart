import { useEffect, useState } from "react"
import { getItems } from "../functions/api"
import ItemShow from "./ItemShow";
import { filterItems, getGroupsList, sortItems } from "../functions/sortitems";
import BodyTabs from "./BodyTabs";
import { Item } from "../functions/exports";

let sortField:keyof Item = "Exec";
let sortWay:boolean = true;
let filterField:keyof Item = "Exec";
let filterOption:string = "";

function Body() {

  const [items, setItems] = useState<Item[]>([]);
  const [grList, setGrList] = useState<string[]>([]);
  const [updBody, setUpdBody] = useState<boolean>(false);
  const [sortTrigger, setSortTrigger] = useState<boolean>(false);

  const handleSort = (sortby:keyof Item) => {
    setSortTrigger(!sortTrigger);
    if (sortby === sortField) {
      sortWay = !sortWay;
      localStorage.setItem('sort_way', JSON.stringify(sortWay));
    }
    setItems(sortItems(items, sortby, sortWay, sortTrigger));
    sortField = sortby;
    localStorage.setItem('sort_field', sortField);
  }

  const fetchData = async () => {
    const str1 = localStorage.getItem('sort_field');
    sortField = str1 as keyof Item;
    const str = localStorage.getItem('sort_way');
    sortWay = str === "true";
    const str2 = localStorage.getItem('filter_field');
    filterField = str2 as keyof Item;
    const str3 = localStorage.getItem('filter_option');
    filterOption = str3 as string;

    let tmpItems:Item[] = await getItems();
    setGrList(getGroupsList(tmpItems));
    if (filterOption !== "") {
      tmpItems = filterItems(tmpItems, filterField, filterOption);
    }

    setItems(sortItems(tmpItems, sortField, sortWay, sortTrigger));
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
        <div className="card-header">
          <BodyTabs grList={grList} setUpdBody={setUpdBody}></BodyTabs>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: "1%" }}></th>
                <th><i className="bi bi-circle"></i><i onClick={() => handleSort("State")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>Type<i onClick={() => handleSort("Type")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>Icon</th>
                <th>Name<i onClick={() => handleSort("Name")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>Group<i onClick={() => handleSort("Group")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>&nbsp;&nbsp;Action</th>
                <th>Logs</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {items?.map((item, i) => (
              <tr key={i}>
                <td className="text-primary text-opacity-75">{i+1}.</td>
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

