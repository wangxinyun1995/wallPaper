"use strict";
const common_vendor = require("../../common/vendor.js");
const api_paper = require("../../api/paper.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const categoryList = common_vendor.ref([]);
    const getCategoryList = async () => {
      let res = await api_paper.apiCategoryList({ pageSize: 15 });
      categoryList.value = res.data;
    };
    getCategoryList();
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸分类",
        path: "/pages/category/category"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸大全",
        imageUrl: "/static/logo.png"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "分类"
        }),
        b: common_vendor.f(categoryList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "8145b772-1-" + i0,
            c: common_vendor.p({
              id: item._id,
              item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8145b772"], ["__file", "/Users/kuban/Desktop/wallPaper/pages/category/category.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
