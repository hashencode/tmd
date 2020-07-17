import "./index.scss";
import "../demo/demoStyle.scss";

import { TmCard, TmList, TmListItem, TmNavBar } from "../../components";

import React from "react";
import { View } from "@tarojs/components";

function Index() {
  // const handleUpload = () => {
  //   Taro.chooseImage({
  //     count: 1,
  //     success: (res) => {
  //       const { host, signature, accessId, policy } = ossSTS;
  //       Taro.uploadFile({
  //         url: host,
  //         filePath: res.tempFilePaths[0],
  //         name: "file",
  //         formData: {
  //           key: "upload_test/empty.png",
  //           policy,
  //           OSSAccessKeyId: accessId,
  //           signature,
  //           success_action_status: "200",
  //         },
  //         success(res) {
  //           console.log(res);
  //         },
  //         fail(err) {
  //           console.log(err);
  //         },
  //       });
  //     },
  //   });
  // };

  return (
    <View className={"demo demo-index"}>
      <TmNavBar tmTitle={"组件"} tmHideBtn />
      <TmCard
        tmRound
        tmShadow
        className={"demo__card"}
        tmTitle={"通用组件"}
        tmBodyStyle={{ padding: 0 }}
      >
        <TmList tmInnerBorder>
          <TmListItem
            tmTitle={"Button 按钮"}
            tmHref={"/pages/demo/button/button"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Icon 图标"}
            tmHref={"/pages/demo/icon/icon"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Image 图片"}
            tmHref={"/pages/demo/image/image"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Picker 选择列表"}
            tmHref={"/pages/demo/picker/picker"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Transition 动画"}
            tmHref={"/pages/demo/transition/transition"}
            tmShowArrow
          />
        </TmList>
      </TmCard>
      <TmCard
        tmRound
        tmShadow
        className={"demo__card"}
        tmTitle={"布局组件"}
        tmBodyStyle={{ padding: 0 }}
      >
        <TmList tmInnerBorder>
          <TmListItem
            tmTitle={"Divider 分割线"}
            tmHref={"/pages/demo/divider/divider"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Flex 栅格"}
            tmHref={"/pages/demo/flex/flex"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Space 间距"}
            tmHref={"/pages/demo/space/space"}
            tmShowArrow
          />
        </TmList>
      </TmCard>
      <TmCard
        tmRound
        tmShadow
        className={"demo__card"}
        tmTitle={"导航组件"}
        tmBodyStyle={{ padding: 0 }}
      >
        <TmList tmInnerBorder>
          <TmListItem
            tmTitle={"NavBar 导航"}
            tmHref={"/pages/demo/navBar/navBar"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"NavGrid 导航宫格"}
            tmHref={"/pages/demo/navGrid/navGrid"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Step 步骤条"}
            tmHref={"/pages/demo/steps/steps"}
            tmShowArrow
          />
        </TmList>
      </TmCard>
      <TmCard
        tmRound
        tmShadow
        className={"demo__card"}
        tmTitle={"数据录入"}
        tmBodyStyle={{ padding: 0 }}
      >
        <TmList tmInnerBorder tmDisabled>
          <TmListItem
            tmTitle={"Checkbox 多选框"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Cascader 级联选择"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Form 表单"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Input 输入框"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"InputNumber 数字输入框"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Textarea 多行文本"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Rate 评分"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Radio 单选框"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Search 搜索"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Switch 开关"}
            tmHref={"/pages/demo/switch/switch"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Slider 滑动输入条"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Select 选择器"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Upload 上传"}
            tmHref={"/pages/demo//"}
            tmShowArrow
          />
        </TmList>
      </TmCard>
      <TmCard
        tmRound
        tmShadow
        className={"demo__card"}
        tmTitle={"数据展示"}
        tmBodyStyle={{ padding: 0 }}
      >
        <TmList tmInnerBorder>
          <TmListItem
            tmTitle={"Avatar 头像"}
            tmHref={"/pages/demo/avatar/avatar"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Badge 徽标数"}
            tmHref={"/pages/demo/badge/badge"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Bill 账单"}
            tmHref={"/pages/demo/bill/bill"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Calendar 日历"}
            tmHref={"/pages/demo/calendar/calendar"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Card 卡片"}
            tmHref={"/pages/demo/card/card"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Collapse 折叠面板"}
            tmHref={"/pages/demo/collapse/collapse"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Coupon 优惠券"}
            tmHref={"/pages/demo/coupon/coupon"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Description 描述"}
            tmHref={"/pages/demo/description/description"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"DropDown 下拉菜单"}
            tmHref={"/pages/demo/dropdown/dropdown"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"List 列表"}
            tmHref={"/pages/demo/list/list"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Popup 弹出层"}
            tmHref={"/pages/demo/popup/popup"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Statistic 统计数值"}
            tmHref={"/pages/demo/statistic/statistic"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Swiper 走马灯"}
            tmHref={"/pages/demo/swiper/swiper"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Tabs 标签页"}
            tmHref={"/pages/demo/tabs/tabs"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Tag 标签"}
            tmHref={"/pages/demo/tag/tag"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"WaterMark 水印"}
            tmHref={"/pages/demo/waterMark/waterMark"}
            tmShowArrow
          />
        </TmList>
      </TmCard>
      <TmCard
        tmRound
        tmShadow
        className={"demo__card"}
        tmTitle={"反馈"}
        tmBodyStyle={{ padding: 0 }}
      >
        <TmList tmInnerBorder>
          <TmListItem
            tmTitle={"Drawer 抽屉"}
            tmHref={"/pages/demo/drawer/drawer"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Loading 加载中"}
            tmHref={"/pages/demo/loading/loading"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Message 消息"}
            tmHref={"/pages/demo/message/message"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Modal 对话框"}
            tmHref={"/pages/demo/modal/modal"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Notice 通知栏"}
            tmHref={"/pages/demo/notice/notice"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Progress 进度条"}
            tmHref={"/pages/demo/progress/progress"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Result 结果页"}
            tmHref={"/pages/demo/result/result"}
            tmShowArrow
          />
          <TmListItem
            tmTitle={"Skeleton 骨架屏"}
            tmHref={"/pages/demo/skeleton/skeleton"}
            tmShowArrow
          />
        </TmList>
      </TmCard>
    </View>
  );
}

export default Index;
