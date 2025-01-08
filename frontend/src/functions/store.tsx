import { makeAutoObservable } from 'mobx';
import { TypeStruct } from './api';

class MobxStore {
    typeList:TypeStruct[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setTypeList(list:TypeStruct[]) {
        this.typeList = list;
    }
}

const mobxStore = new MobxStore();
export default mobxStore;