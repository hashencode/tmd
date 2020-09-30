import "../demoStyle.scss";

import {
  TmAvatar,
  TmList,
  TmListItem,
  TmNavBar,
  TmSwitch,
} from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoList() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"列表"} />
      <TmList
        tmShadow
        tmOuterBorder
        tmInnerBorder
        style={{ marginTop: "12px" }}
      >
        <TmListItem tmTitle={"自定义标题"} tmSubtitle={"自定义二级标题"} />
        <TmListItem
          tmTitle={"设置左侧图像"}
          tmSubtitle={"并显示右侧箭头"}
          tmShowArrow
          tmImage={
            <TmAvatar
              tmSize={100}
              tmSrc={
                " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
              }
            />
          }
        />
        <TmListItem tmTitle={"右侧文案"} tmAction={"文案"} tmShowArrow />
        <TmListItem tmTitle={"顶部对齐"} TmTitleAlignTop tmShowArrow>
          很长长长长长长长长长长长长长长长长长长长长长长的内容
        </TmListItem>
        <TmListItem tmTitle={"禁用"} tmAction={<TmSwitch />} tmDisabled />
        <TmListItem tmTitle={"设置右侧操作项"} tmAction={<TmSwitch />} />
      </TmList>
      <TmList
        tmShadow
        tmOuterBorder
        tmInnerBorder
        tmIndent
        tmRound
        style={{ marginTop: "12px" }}
      >
        <TmListItem tmTitle={"带缩进"} tmSubtitle={"自定义二级标题"} />
        <TmListItem tmTitle={"圆角边框"} />
        <TmListItem
          tmTitle={"自定义标题"}
          tmSubtitle={"自定义二级标题"}
          tmImage={
            <TmAvatar
              tmSize={100}
              tmSrc={
                " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
              }
            />
          }
        />
        <TmListItem
          tmTitle={"自定义标题"}
          tmSubtitle={"自定义二级标题"}
          tmImage={
            <TmAvatar
              tmSize={100}
              tmSrc={
                " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
              }
            />
          }
        />
      </TmList>
    </View>
  );
}

export default DemoList;
