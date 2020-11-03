import { pxTransform } from "@tarojs/taro";

const transformPx = (value) => {
  // @ts-ignore
  return typeof value === "string" ? value : pxTransform(value, 750);
};

export default transformPx;
