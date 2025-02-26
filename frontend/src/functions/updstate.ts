import { apiExec } from "./api";
import { Item } from "./exports";
import mobxStore from "./store";

interface Res {
  Ok: boolean;
  Out: string;
}

async function updItemState(item:Item) {
  
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

export function updAllItems() {

  for (let item of mobxStore.itemList) {
    // console.log("ITEM", item);
    updItemState(item);
  }
}