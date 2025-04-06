import { apiExec, getItems, getTypes } from "./api";
import { Item, TypeStruct } from "./exports";
import { applyFilters, updGroupsList } from "./sort_filter";
import mobxStore from "./store";

interface Res {
  Ok: boolean;
  Out: string;
}

// runs once at the start
export const startUpdateCycle = () => {

  prepareAllData();

  setTimeout(() => {
    updAllItems();
  }, 1000);

  setInterval(() => {
    updAllItems();
  }, 60000); // 60000 ms = 1 minute
}

export const prepareAllData = async () => {

  const types:TypeStruct[] = await getTypes();
  mobxStore.setTypeList(types);

  let items:Item[] = await getItems();

  types.forEach(type => {
    items.map(item => {
      if (item.Type === type.Name) {
        item.AnyCom = type.AnyCom;
        return item
      } else {
        return item
      }
    })
  });

  mobxStore.setItemList(items);
  applyFilters();
  updGroupsList();
}

export function updAllItems() {

  for (let item of mobxStore.itemList) {
    updItemState(item);
  }
}

export async function updItemState(item:Item) {
  
  let res:Res;
  item.Exec = "State";
  
  res = await apiExec(item);

  if (res.Ok) {
    item.State = "on";

    item.Exec = "CPU";
    res = await apiExec(item);
    item.CPU = res.Ok ? res.Out : "";

    item.Exec = "Mem";
    res = await apiExec(item);
    item.Mem = res.Ok ? res.Out : "";
  } else {
    item.State = "off";
    item.CPU = "";
    item.Mem = "";
  }

  mobxStore.updItemList(item);
}