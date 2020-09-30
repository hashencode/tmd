import { observable } from "mobx";
import { getGlobalSystemInfo } from "../functions";

export default class systemStore {
  // 系统信息
  @observable systemInfo: any = getGlobalSystemInfo();
}
