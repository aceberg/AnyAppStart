import { Conf, Item, TypeStruct } from "./exports";

const api = 'http://0.0.0.0:8830';

export const getConfig = async () => {
    const url = api+'/api/conf';
    const conf = await (await fetch(url)).json();
  
    return conf;
};

export const getItems = async () => {
    const url = api+'/api/items';
    const items = await (await fetch(url)).json();
  
    return items;
};

export const getTypes = async () => {
    const url = api+'/api/types';
    const types = await (await fetch(url)).json();
  
    return types;
};

export const apiExec = async (item: Item) => {

    const url = api+'/api/exec?name='+item.Name+'&type='+item.Type+'&exec='+item.Exec;
    const res = await (await fetch(url)).json();
  
    return res;
};

export const apiSaveItem = async (oldItem: Item, newItem: Item) => {
    let data = new FormData();
    data.set('old', JSON.stringify(oldItem));
    data.set('new', JSON.stringify(newItem));
  
    let request = new XMLHttpRequest();
    request.open("POST", api+'/api/item', true);
    request.send(data);
};

export const apiSaveType = async (oldType: TypeStruct, newType: TypeStruct) => {
    let data = new FormData();
    data.set('old', JSON.stringify(oldType));
    data.set('new', JSON.stringify(newType));
  
    let request = new XMLHttpRequest();
    request.open("POST", api+'/api/type', true);
    request.send(data);
};

export const apiSaveConf = async (conf: Conf) => {
    let data = new FormData();
    
    data.set('conf', JSON.stringify(conf));
  
    let request = new XMLHttpRequest();
    request.open("POST", api+'/api/conf', true);
    request.send(data);
};

export const apiExecAny = async (item: Item, cmd: string) => {
    let data = new FormData();
  
    data.set('item', JSON.stringify(item));
    data.set('command', cmd);
  
    try {
      let response = await fetch(api + '/api/exec', {
          method: "POST",
          body: data
      });
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      let result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };