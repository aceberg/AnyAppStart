import { Item } from "./api";

export const sortItems = (items:Item[], field:keyof Item, asc:boolean, trig:boolean) => {
  trig = !trig; // trigger to run sort
  if (items.length > 1) {
    items.sort((a, b) => byField(a, b, field, asc));
  }
  
  return items;
};

function byField(a:Item, b:Item, fieldName:keyof Item, down:boolean){
  if (a[fieldName] > b[fieldName]) {
      return down ? 1 : -1;
  } else {
      return !down ? 1 : -1;
  }
};

export const filterItems = (items:Item[], field:keyof Item, option: string) => {
  if (items.length > 0) {
    items = items.filter((item) => item[field] == option);
  }
  
  return items;
};
