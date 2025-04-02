import { configure, makeAutoObservable } from 'mobx';
import { Conf, Item, TypeStruct } from './exports';


configure({
    enforceActions: "never",
});

class MobxStore {
    constructor() {
        makeAutoObservable(this);
    }

    itemList:Item[] = [];
    setItemList(list:Item[]) {
        this.itemList = list;
    }
    updItemList(newItem:Item) {
        this.itemList.map((item) => {
            if (item.ID == newItem.ID) {
                return {item, State: newItem.State, CPU: newItem.CPU, Mem: newItem.Mem}
            } else {
                return item
            }
        });
    }

    itemFiltered:Item[] = [];
    setItemFiltered(list:Item[]) {
        this.itemFiltered = list;
    }

    typeList:TypeStruct[] = [];
    setTypeList(list:TypeStruct[]) {
        this.typeList = list;
    }

    appConfig:Conf = {
        Host: "",
        Port: "",
        Theme: "",
        Color: "",
        NodePath: ""
    }
    setAppConfig(conf:Conf) {
        this.appConfig = conf;
    }

    updHead:boolean = false;
    setUpdHead(b:boolean) {
        this.updHead = b;
    }

    updBody:boolean = false;
    setUpdBody(b:boolean) {
        this.updBody = b;
    }

    sortField:keyof Item = "Exec";
    setSortField(k:keyof Item) {
        localStorage.setItem('sort_field', k);
        this.sortField = k;
    }
    getSortField() {
        const str = localStorage.getItem('sort_field');
        this.sortField = str as keyof Item;
        return this.sortField;
    }

    sortWay:boolean = true;
    setSortWay(b:boolean) {
        localStorage.setItem('sort_way', JSON.stringify(b));
        this.sortWay = b;
    }
    getSortWay() {
        const str = localStorage.getItem('sort_way');
        this.sortWay = str === "true";
        return this.sortWay;
    }

    filterGroup:string = "";
    setFilterGroup(s:string) {
        // localStorage.setItem('filter_group', s);
        this.filterGroup = s;
    }
    getFilterGroup() {
        // const str = localStorage.getItem('filter_group');
        // this.filterGroup = str?str:"";
        return this.filterGroup;
    }

    filterType:string = "";
    setFilterType(s:string) {
        localStorage.setItem('filter_type', s);
        this.filterType = s;
    }
    getFilterType() {
        const str = localStorage.getItem('filter_type');
        this.filterType = str?str:"";
        return this.filterType;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;