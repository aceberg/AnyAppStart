const api = 'http://0.0.0.0:8855';

export interface Item {
    Group: string;
    Name: string;
    Type: string;
    Exec: string;
    State: string;
};

export interface Conf {
    Host: string;
    Port: string;
    Theme: string;
    Color: string;
    NodePath: string;
};

export interface TypeStruct {
    Name: string;
    Start: string;
    Stop: string;
    Restart: string;
    Logs: string;
    State: string;
};

export let appConfig:Conf = {
    Host: "",
    Port: "",
    Theme: "",
    Color: "",
    NodePath: ""
};

export interface ToFilter {
    Field: keyof Item;
    Option: string;
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