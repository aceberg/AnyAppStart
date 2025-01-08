import { makeAutoObservable } from 'mobx';
import { Conf, TypeStruct } from './exports';


class MobxStore {
    typeList:TypeStruct[] = [];

    appConfig:Conf = {
        Host: "",
        Port: "",
        Theme: "",
        Color: "",
        NodePath: ""
    }

    constructor() {
        makeAutoObservable(this);
    }

    setTypeList(list:TypeStruct[]) {
        this.typeList = list;
    }

    setAppConfig(conf:Conf) {
        this.appConfig = conf;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;