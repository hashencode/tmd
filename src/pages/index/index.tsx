import "./index.scss";
import "../demo/demoStyle.scss";

import { TmCard, TmList, TmListItem, TmNavBar } from "../../components";

import React from "react";
import { View } from "@tarojs/components";

function Index() {
  const list = [
    {
      title: "通用组件",
      children: [
        { title: "Button 按钮", link: "button" },
        { title: "Icon 图标", link: "icon" },
        { title: "Image 图片", link: "image" },
        { title: "Picker 选择列表", link: "picker" },
        { title: "Transition 动画", link: "transition" }
      ]
    },
    {
      title: "布局组件",
      children: [
        { title: "Divider 分割线", link: "divider" },
        { title: "Flex 栅格", link: "flex" },
        { title: "Space 间距", link: "space" }
      ]
    },
    {
      title: "导航组件",
      children: [
        { title: "NavBar 导航", link: "navBar" },
        { title: "NavGrid 导航宫格", link: "navGrid" },
        { title: "Step 步骤条", link: "steps" }
      ]
    },
    {
      title: "数据录入",
      children: [
        { title: "Checkbox 多选框", link: "checkbox" },
        { title: "Cascader 级联选择 🔴", link: "cascader" },
        { title: "DropDown 下拉菜单 🔴", link: "dropdown" },
        { title: "Input 输入框", link: "input" },
        { title: "InputNumber 数字输入框", link: "inputNumber" },
        { title: "Textarea 多行文本", link: "textarea" },
        { title: "Rate 评分 🔴", link: "rate" },
        { title: "Search 搜索 🔴", link: "search" },
        { title: "Switch 开关", link: "switch" },
        { title: "Slider 滑动输入条 🔴", link: "slider" },
        { title: "Select 选择器 🔴", link: "select" },
        { title: "Upload 上传 🔴", link: "upload" }
      ]
    },
    {
      title: "数据展示",
      children: [
        { title: "Avatar 头像", link: "avatar" },
        { title: "Badge 徽标数", link: "badge" },
        { title: "Bill 账单", link: "bill" },
        { title: "Calendar 日历 🔴", link: "calendar" },
        { title: "Card 卡片", link: "card" },
        { title: "Collapse 折叠面板", link: "collapse" },
        { title: "Coupon 优惠券", link: "coupon" },
        { title: "Description 描述", link: "description" },
        { title: "List 列表", link: "list" },
        { title: "Popup 弹出层", link: "popup" },
        { title: "Scroll 滚动增强", link: "scroll" },
        { title: "Statistic 统计数值", link: "statistic" },
        { title: "Tabs 标签页", link: "tabs" },
        { title: "Tag 标签", link: "tag" },
        { title: "WaterMark 水印", link: "waterMark" }
      ]
    },
    {
      title: "反馈",
      children: [
        { title: "Drawer 抽屉", link: "drawer" },
        { title: "Loading 加载中", link: "loading" },
        { title: "Message 消息", link: "message" },
        { title: "Modal 对话框", link: "modal" },
        { title: "Notice 通知栏", link: "notice" },
        { title: "Progress 进度条", link: "progress" },
        { title: "Result 结果页", link: "result" },
        { title: "Skeleton 骨架屏", link: "skeleton" }
      ]
    }
  ];

  return (
    <View className={"demo demo-index"}>
      <TmNavBar tmTitle={"组件"} tmHideBtn tmShadow />
      {list.map(({ title, children }, index) => {
        return (
          <TmCard
            tmRound
            tmShadow
            className={"demo__card"}
            tmTitle={title}
            tmBodyStyle={{ padding: 0 }}
            key={`${title}_${index}`}
          >
            <TmList tmInnerBorder tmIndent>
              {children.map(({ title, link }) => {
                return (
                  <TmListItem
                    tmTitle={title}
                    tmHref={`/pages/demo/${link}/${link}`}
                    tmShowArrow
                    key={link}
                  />
                );
              })}
            </TmList>
          </TmCard>
        );
      })}
    </View>
  );
}

export default Index;
