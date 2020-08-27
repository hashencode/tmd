import "./style/init.scss";

import React, {Component} from "react";

import {setStorageSync} from "@tarojs/taro";
import {View} from "@tarojs/components";

class App extends Component {
  componentDidMount() {
    setStorageSync("firstLoad", "1");
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <View>{this.props.children}</View>;
  }
}

export default App;
