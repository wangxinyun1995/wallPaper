"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM = common_vendor.index.getSystemInfoSync();
const getStatusHeight = () => SYSTEM.statusBarHeight || 15;
const getTitleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - getStatusHeight()) * 2;
  } else {
    return 40;
  }
};
const getNavBarHeight = () => {
  return getTitleBarHeight() + getStatusHeight();
};
exports.getNavBarHeight = getNavBarHeight;
exports.getStatusHeight = getStatusHeight;
exports.getTitleBarHeight = getTitleBarHeight;
