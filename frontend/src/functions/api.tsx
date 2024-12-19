const api = 'http://0.0.0.0:8855';

export interface Item {
    Group: string;
    Name: string;
    Type: string;
    Exec: string;
    State: string;
};

export interface Conf {
    Theme: string;
    Color: string;
};

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

export const apiExec = async (item: Item) => {

    const url = api+'/api/exec?name='+item.Name+'&type='+item.Type+'&exec='+item.Exec;
    const res = await (await fetch(url)).json();
  
    return res;
  };