import { Item } from "./api";

export const sortItems = (items:Item[], field:keyof Item, asc:boolean) => {
  
  items.sort((a, b) => byField(a, b, field, asc));
  
return items;
};

function byField(a:Item, b:Item, fieldName:keyof Item, down:boolean){
  if (a[fieldName] > b[fieldName]) {
      return down ? 1 : -1;
  } else {
      return !down ? 1 : -1;
  }
}