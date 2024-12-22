const api = 'http://0.0.0.0:8855';

export interface Item {
    Group: string;
    Name: string;
    Type: string;
    Exec: string;
};

export interface Conf {
    Host: string;
    Port: string;
    Theme: string;
    Color: string;
    NodePath: string;
};

export let appConfig:Conf = {
    Host: "",
    Port: "",
    Theme: "",
    Color: "",
    NodePath: ""
};

export const getConfig = async () => {
    const url = api+'/api/conf';
    const conf = await (await fetch(url)).json();

    appConfig = conf;
  
    return conf;
};

export const getItems = async () => {
    const url = api+'/api/items';
    const items = await (await fetch(url)).json();
  
    return items;
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

export const apiSaveConf = async (conf: Conf) => {
    let data = new FormData();
    
    data.set('conf', JSON.stringify(conf));
  
    let request = new XMLHttpRequest();
    request.open("POST", api+'/api/conf', true);
    request.send(data);
};