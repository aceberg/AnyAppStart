import { useEffect, useState } from "react"
import ItemShow from "./ItemShow";
import { filterItems, getGroupsList, sortItems } from "../functions/sortitems";
import BodyTabs from "./BodyTabs";
import { Item } from "../functions/exports";
import { observer } from "mobx-react-lite";
import mobxStore from "../functions/store";
import BodyGroupFilter from "./BodyGroupFilter";

const Body: React.FC = observer(() => {

  const stateOn = "bi bi-circle-fill text-success";
  const stateOff = "bi bi-circle-fill text-danger";

  const [grList, setGrList] = useState<string[]>([]);
  const [sortTrigger, setSortTrigger] = useState<boolean>(false);

  const handleSort = (sortBy:keyof Item) => {
    setSortTrigger(!sortTrigger);
    if (sortBy === mobxStore.sortField) {
      mobxStore.setSortWay(!mobxStore.sortWay);
    }
    mobxStore.setItemFiltered(sortItems(mobxStore.itemFiltered, sortBy, mobxStore.sortWay, sortTrigger));
    mobxStore.setSortField(sortBy);
  }

  const fetchData = () => {

    let tmpItems:Item[] = mobxStore.itemList;
    setGrList(getGroupsList(tmpItems));
    tmpItems = filterItems(tmpItems, "Type", mobxStore.getFilterType());
    tmpItems = filterItems(tmpItems, "Group", mobxStore.getFilterGroup());
    
    mobxStore.setItemFiltered(sortItems(tmpItems, mobxStore.getSortField(), mobxStore.getSortWay(), sortTrigger));
  };

  useEffect(() => {
    fetchData();
    mobxStore.setUpdBody(false);
    // console.log("BODY UPD");
  }, [mobxStore.updBody]);

  return (
    <div className="row mt-2">
      <div className="col-md">
      <div className="card border-primary">
        <div className="card-header">
          <BodyTabs></BodyTabs>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ width: "1%" }}></th>
                <th><i className="bi bi-circle"></i><i onClick={() => handleSort("State")} className="bi bi-sort-down-alt text-primary shade-hover"></i></th>
                <th>CPU</th>
                <th>Mem</th>
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
            {mobxStore.itemFiltered?.map((item, i) => (
              <tr key={i}>
                <td className="text-primary text-opacity-75">{i+1}.</td>
                <td><i className={item.State == "on" ? stateOn : stateOff }></i></td>
                <td>{item.CPU}</td>
                <td>{item.Mem}</td>
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

