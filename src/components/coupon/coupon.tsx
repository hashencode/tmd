import React, { ReactNode, useState } from "react";

import { View } from "@tarojs/components";
import classNames from "classnames";
import { TmIcon } from "../../index";
import { colorPrimary } from "../../functions/theme";

export interface couponProps {
  tmAmount?: number | string | ReactNode; // 金额
  tmButton?: ReactNode; // 操作按钮插槽
  tmColor?: string; // 主颜色
  tmExpiration?: string | ReactNode; // 有效日期
  tmPrefix?: string | ReactNode; // 前缀
  tmSubtitle?: string | ReactNode; // 副标题
  tmSuffix?: string | ReactNode; // 后缀
  tmTitle?: string | ReactNode; // 优惠券标题
  tmVertical?: boolean; // 竖向显示
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
}

function TmCoupon(props: couponProps) {
  const {
    tmAmount = null,
    tmButton = null,
    tmColor = colorPrimary,
    tmExpiration = null,
    tmPrefix = "",
    tmSubtitle = null,
    tmSuffix = "",
    tmTitle = null,
    tmVertical = false,
    className = "",
    style = {},
  } = props;

  const [isFold, setIsFold] = useState(true);

  const handleFoldClick = () => {
    setIsFold(!isFold);
  };

  return (
    <View className={classNames("tm-coupon", className)} style={style}>
      {tmVertical ? (
        <View className="tm-coupon-vertical">
          <View className="tm-coupon-vertical__content">
            {/* 优惠券标题和描述 */}
            <View className="tm-coupon-vertical__info">
              <View className="tm-coupon-vertical__title">{tmTitle}</View>
              <View className="tm-coupon-vertical__subtitle">{tmSubtitle}</View>
            </View>
            {/* 优惠券金额 */}
            <View
              className="tm-coupon-vertical__amount"
              style={{ color: tmColor }}
            >
              {/* 金额前缀 */}
              <View className="tm-coupon-vertical__prefix">{tmPrefix}</View>
              {tmAmount}
              {/* 金额后缀 */}
              <View className="tm-coupon-vertical__suffix">{tmSuffix}</View>
            </View>
          </View>
          <View className="tm-coupon-vertical__expend">
            {/* 有效期 */}
            <View className="tm-coupon-vertical__expiration">
              {tmExpiration}
            </View>
            {/* 展开按钮，只有在由内容的时候展示 */}
            {props.children && (
              <View
                className="tm-coupon-vertical__toggle"
                onClick={handleFoldClick}
              >
                {isFold ? "详细规则" : "收起"}
                <View className="tm-coupon-vertical__toggle-icon">
                  <TmIcon tmValue={isFold ? "arrow_down" : "arrow_up"} />
                </View>
              </View>
            )}
            {tmButton}
          </View>
          {/* 优惠券规则 */}
          {!isFold && (
            <View className="tm-coupon-vertical__rules">{props.children}</View>
          )}
        </View>
      ) : (
        <View className="tm-coupon-horizon">
          {/* 优惠券金额与描述 */}
          <View
            className="tm-coupon-horizon__left"
            style={{ backgroundColor: tmColor }}
          >
            <View className="tm-coupon-horizon__amount">
              <View className="tm-coupon-horizon__prefix">{tmPrefix}</View>
              {tmAmount}
              <View className="tm-coupon-horizon__suffix">{tmSuffix}</View>
            </View>
            <View className="tm-coupon-horizon__subtitle">{tmSubtitle}</View>
          </View>
          {/* 优惠券标题与有效时间 */}
          <View className="tm-coupon-horizon__right">
            <View className="tm-coupon-horizon__title">{tmTitle}</View>
            <View className="tm-coupon-horizon__footer">
              <View className="tm-coupon-horizon__expiration">
                {tmExpiration}
              </View>
              {tmButton}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default TmCoupon;
