"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
const _sfc_main = {
  __name: "theme-item",
  props: {
    isMore: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default() {
        return {
          name: "动物世界",
          picurl: "../../common/images/classify1.jpg",
          updateTime: Date.now()
        };
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isMore
      }, !__props.isMore ? common_vendor.e({
        b: __props.item.picurl,
        c: common_vendor.t(__props.item.name),
        d: common_vendor.unref(utils_common.formatTime)(__props.item.updateTime)
      }, common_vendor.unref(utils_common.formatTime)(__props.item.updateTime) ? {
        e: common_vendor.t(common_vendor.unref(utils_common.formatTime)(__props.item.updateTime))
      } : {}, {
        f: "/pages/category-list/category-list?id=" + __props.item._id + "&name=" + __props.item.name
      }) : {
        g: common_assets._imports_0$1
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4eafbca"], ["__file", "/Users/kuban/Desktop/wallPaper/components/theme-item/theme-item.vue"]]);
wx.createComponent(Component);
