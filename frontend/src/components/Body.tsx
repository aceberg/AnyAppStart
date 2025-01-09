import { useEffect, useState } from "react"
import { getItems } from "../functions/api"
import ItemShow from "./ItemShow";
import { filterItems, getGroupsList, sortItems } from "../functions/sortitems";
import BodyTabs from "./BodyTabs";
import { Item } from "../functions/exports";
import { observer } from "mobx-react-lite";
import mobxStore from "../functions/store";
import BodyGroupFilter from "./BodyGroupFilter";

const Body: React.FC = observer(() => {

  const [items, setItems] = useState<Item[]>([]);
  const [grList, setGrList] = useState<string[]>([]);
  const [sortTrigger, setSortTrigger] = useState<boolean>(false);

  const handleSort = (sortBy:keyof Item) => {
    setSortTrigger(!sortTrigger);
    if (sortBy === mobxStore.sortField) {
      mobxStore.setSortWay(!mobxStore.sortWay);
    }
    setItems(sortItems(items, sortBy, mobxStore.sortWay, sortTrigger));
    mobxStore.setSortField(sortBy);
  }

  const fetchData = async () => {

    let tmpItems:Item[] = await getItems();
    setGrList(getGroupsList(tmpItems));
    tmpItems = filterItems(tmpItems, "Type", mobxStore.getFilterType());
    tmpItems = filterItems(tmpItems, "Group", mobxStore.getFilterGroup());
    
    setItems(sortItems(tmpItems, mobxStore.getSortField(), mobxStore.getSortWay(), sortTrigger));
  };

  useEffect(() => {
    fetchData();
    mobxStore.setUpdBody(false);
    // console.log("BODY UPD");
  }, [mobxStore.updBody]);

  useEffect(() => { // Regular update
    setInterval(() => {
      fetchData();
    }, 60000); // 60000 ms = 1 minute
  }, []);

  return (
    <div className="row mt-2">
      <div className="col-md">
      <div className="card border-primary">
        <div className="card-header">
          <BodyTabs></BodyTabs>
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
                <th><BodyGroupFilter grList={grList}></BodyGroupFilter><i onClick={() => handleSort("Group")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>&nbsp;&nbsp;Action</th>
                <th>Logs</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {items?.map((item, i) => (
              <tr key={i}>
                <td className="text-primary text-opacity-75">{i+1}.</td>
                <ItemShow item={item}></ItemShow>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  )
});

export default Body

