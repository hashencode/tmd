import { observable, action } from "mobx";

export default class navBarStore {
  // 首次载入
  @observable isFirstLoad: boolean = true;

  // 设置为非首次载入
  @action setNotFirstLoad() {
    this.isFirstLoad = false;
  }
}
