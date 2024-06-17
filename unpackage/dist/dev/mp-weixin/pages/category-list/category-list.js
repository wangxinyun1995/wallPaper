"use strict";
const common_vendor = require("../../common/vendor.js");
const api_paper = require("../../api/paper.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "category-list",
  setup(__props) {
    const categoryListItem = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    let query_params = {
      pageNum: 1,
      pageSize: 12
    };
    common_vendor.onLoad((e) => {
      let { id = null, name = null, type = null } = e;
      if (type)
        query_params.type = type;
      if (id)
        query_params.classid = id;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      query_params.title = name;
      getCategoryListItem();
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      query_params.pageNum += 1;
      getCategoryListItem();
    });
    const getCategoryListItem = async () => {
      let res;
      if (query_params.classid)
        res = await api_paper.apiCategoryListItem(query_params);
      if (query_params.type)
        res = await api_paper.apiUserHistory(query_params);
      categoryListItem.value = [...categoryListItem.value, ...res.data];
      if (res.data.length < query_params.pageSize) {
        noData.value = true;
      }
      common_vendor.index.setStorageSync("storageCategory", categoryListItem.value);
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸大全" + query_params.title,
        path: "/pages/category-list/category-list?id=" + query_params.classid + "&name=" + query_params.title
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸大全" + query_params.title,
        query: "id=" + query_params.classid + "&name=" + query_params.title
      };
    });
    common_vendor.onUnload(() => {
      return common_vendor.index.removeStorageSync("storageCategory");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !categoryListItem.value.length && !noData.value
      }, !categoryListItem.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(categoryListItem.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        d: categoryListItem.value.length || noData.value
      }, categoryListItem.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dcfabacb"], ["__file", "/Users/kuban/Desktop/wallPaper/pages/category-list/category-list.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
