import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { sortItems } from "../functions/sort_filter";
import { Item } from "../functions/exports";
import mobxStore from "../functions/store";

import ItemShow from "../components/Body/ItemShow";
import BodyTabs from "../components/Body/BodyTabs";
import BodyGroupFilter from "../components/Body/BodyGroupFilter";


const Body: React.FC = observer(() => {

  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate("/item/"+id);
  }

  const stateOn = "bi bi-circle-fill text-success";
  const stateOff = "bi bi-circle-fill text-danger";

  const handleSort = (sortBy:keyof Item) => {
    if (sortBy === mobxStore.sortField) {
      mobxStore.setSortWay(!mobxStore.sortWay);
    }
    mobxStore.setItemFiltered(sortItems(mobxStore.itemFiltered, sortBy, mobxStore.sortWay, true));
    mobxStore.setSortField(sortBy);
  }

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
                <th>
                  <i className="bi bi-circle"></i><i onClick={() => handleSort("State")} className={"bi bi-sort-down-alt shade-hover " + (mobxStore.sortField === "State" ? "text-success" : "text-body")}></i></th>
                <th>CPU</th>
                <th>Mem</th>
                <th>Icon</th>
                <th>
                  Name<i onClick={() => handleSort("Name")} 
                  className={"bi bi-sort-down-alt shade-hover " + (mobxStore.sortField === "Name" ? "text-success" : "text-body")}></i></th>
                <th>
                  Type<i onClick={() => handleSort("Type")} 
                  className={"bi bi-sort-down-alt shade-hover " + (mobxStore.sortField === "Type" ? "text-success" : "text-body")}></i></th>
                <th><BodyGroupFilter></BodyGroupFilter>
                  <i onClick={() => handleSort("Group")} 
                  className={"bi bi-sort-down-alt shade-hover " + (mobxStore.sortField === "Group" ? "text-success" : "text-body")}></i></th>
                <th>&nbsp;&nbsp;Action</th>
                <th>Logs</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {mobxStore.itemFiltered?.map((item, i) => (
              <tr key={i} style={{ cursor: "pointer" }}>
                <td onClick={() => handleNavigate(item.ID)} className="text-primary text-opacity-75">{i+1}.</td>
                <td onClick={() => handleNavigate(item.ID)}><i className={item.State == "on" ? stateOn : stateOff }></i></td>
                <td onClick={() => handleNavigate(item.ID)}>{item.CPU}</td>
                <td onClick={() => handleNavigate(item.ID)}>{item.Mem}</td>
                <ItemShow item={item} handleNavigate={handleNavigate}></ItemShow>
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

