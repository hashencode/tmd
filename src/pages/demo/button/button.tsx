import "../demoStyle.scss";

import React, { useEffect } from "react";
import {
  TmButton,
  TmCard,
  TmDivider,
  TmIcon,
  TmNavBar,
  TmSpace,
} from "../../../components";

import { View } from "@tarojs/components";

function DemoButton() {
  useEffect(() => {}, []);

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"按钮"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace>
          <TmButton
            tmSize={"lg"}
            onClick={(event) => {
              console.log(event);
            }}
          >
            大
          </TmButton>
          <TmButton tmSize={"mid"}>中</TmButton>
          <TmButton tmSize={"sm"}>小</TmButton>
        </TmSpace>
        <TmDivider />
        <TmSpace>
          <TmButton tmSize={"lg"} tmShape={"circle"}>
            大
          </TmButton>
          <TmButton tmShape={"circle"}>中</TmButton>
          <TmButton tmShape={"circle"} tmSize={"sm"}>
            小
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"外观"}>
        <TmSpace>
          <TmButton tmShape={"circle"}>圆</TmButton>
          <TmButton tmShape={"rect"}>矩形</TmButton>
          <TmButton tmShape={"round"}>圆角</TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"类型"}>
        <TmSpace>
          <TmButton tmType={"primary"}>主要</TmButton>
          <TmButton tmType={"dashed"}>次要</TmButton>
          <TmButton>默认</TmButton>
          <TmButton tmType={"link"}>文字</TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"危险"}>
        <TmSpace>
          <TmButton tmType={"primary"} tmDanger>
            危险
          </TmButton>
          <TmButton tmType={"dashed"} tmDanger>
            危险
          </TmButton>
          <TmButton tmDanger>危险</TmButton>
          <TmButton tmType={"link"} tmDanger>
            危险
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"幽灵按钮"}>
        <TmSpace style={{ background: "#cdcdcd", padding: "12px" }}>
          <TmButton tmType={"primary"} tmGhost>
            幽灵
          </TmButton>
          <TmButton tmType={"dashed"} tmGhost>
            幽灵
          </TmButton>
          <TmButton tmGhost>幽灵</TmButton>
          <TmButton tmType={"link"} tmGhost>
            幽灵
          </TmButton>
        </TmSpace>
        <TmSpace style={{ background: "#cdcdcd", padding: "12px" }}>
          <TmButton tmType={"primary"} tmGhost tmDanger>
            幽灵
          </TmButton>
          <TmButton tmType={"dashed"} tmGhost tmDanger>
            幽灵
          </TmButton>
          <TmButton tmGhost tmDanger>
            幽灵
          </TmButton>
          <TmButton tmType={"link"} tmGhost tmDanger>
            幽灵
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"块状按钮"}>
        <TmButton tmBlock>块状按钮</TmButton>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义图标"}>
        <TmSpace>
          <TmButton
            tmShape={"circle"}
            tmIcon={<TmIcon tmValue={"microphone"} />}
          />
          <TmButton tmShape={"rect"} tmIcon={<TmIcon tmValue={"microphone"} />}>
            图标
          </TmButton>
          <TmButton tmType={"link"} tmIcon={<TmIcon tmValue={"microphone"} />}>
            图标
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"加载"}>
        <TmSpace>
          <TmButton tmLoading>加载中...</TmButton>
          <TmButton tmType={"link"} tmLoading>
            加载中...
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmSpace>
          <TmButton tmType={"primary"} tmDisabled>
            禁用
          </TmButton>
          <TmButton tmType={"link"} tmDisabled>
            禁用
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"阴影"}>
        <TmSpace>
          <TmButton tmType={"default"} tmShadow>
            有
          </TmButton>
          <TmButton tmType={"default"}>无</TmButton>
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoButton;
