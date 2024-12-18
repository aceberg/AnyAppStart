const api = 'http://0.0.0.0:8855';

export interface Item {
    Group: string;
    DName: string;
    Name: string;
    Type: string;
    Start: string;
    Stop: string;
    Restart: string;
}

export const getItems = async () => {
    const url = api+'/api/items';
    const items = await (await fetch(url)).json();
  
    return items;
};