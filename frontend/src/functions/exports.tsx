export interface Item {
    ID: number;
    Group: string;
    Name: string;
    Type: string;
    Link: string;
    Icon: string;
    Exec: string;
    State: string;
    Mem: string;
    CPU: string;
    AnyCom: string;
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
    CPU: string;
    Mem: string;
    SSH: string;
    AnyCom: string;
};

export const emptyItem:Item = {
    ID: 0,
    Group: "",
    Name: "",
    Type: "",
    Link: "",
    Icon: "",
    State: "",
    Exec: "",
    CPU: "",
    Mem: "",
    AnyCom: "",
};