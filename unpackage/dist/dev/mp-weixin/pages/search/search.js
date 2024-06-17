"use strict";
const common_vendor = require("../../common/vendor.js");
const api_search = require("../../api/search.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uv_empty2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uv_empty + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: ""
    });
    const historySearch = common_vendor.ref(common_vendor.index.getStorageSync("historySearch") || []);
    const hotSearch = common_vendor.ref(["美女", "帅哥", "宠物", "卡通"]);
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const noSearch = common_vendor.ref(false);
    const onSearch = () => {
      if (queryParams.value.keyword.length === 0) {
        return common_vendor.index.showModal({
          title: "请输入搜索关键字"
        });
      }
      common_vendor.index.showLoading();
      historySearch.value = [.../* @__PURE__ */ new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);
      common_vendor.index.setStorageSync("historySearch", historySearch.value);
      initQueryParams(queryParams.value.keyword);
      searchData();
    };
    const searchData = async () => {
      try {
        let res = await api_search.apiSearchData(queryParams.value);
        classList.value = [...classList.value, ...res.data];
        common_vendor.index.setStorageSync("storageCategory", classList.value);
        if (queryParams.value.pageSize > res.data.length)
          noData.value = true;
        if (res.data.length == 0 && classList.value.length == 0)
          noSearch.value = true;
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const clickTab = (value) => {
      initQueryParams(value);
      onSearch();
    };
    const initQueryParams = (value = "") => {
      classList.value = [];
      noData.value = false;
      noSearch.value = false;
      queryParams.value = {
        pageNum: 1,
        pageSize: 12,
        keyword: value
      };
    };
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.value.pageNum++;
      searchData();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList", classList.value);
    });
    const onClear = () => {
      initQueryParams();
    };
    const removeHistory = () => {
      common_vendor.index.showModal({
        title: "是否情况历史记录",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("historySearch");
            historySearch.value = [];
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onSearch),
        b: common_vendor.o(onClear),
        c: common_vendor.o(onClear),
        d: common_vendor.o(($event) => queryParams.value.keyword = $event),
        e: common_vendor.p({
          focus: true,
          placeholder: "搜索",
          modelValue: queryParams.value.keyword
        }),
        f: !classList.value.length || noSearch.value
      }, !classList.value.length || noSearch.value ? common_vendor.e({
        g: historySearch.value.length
      }, historySearch.value.length ? {
        h: common_vendor.p({
          type: "trash",
          size: "25"
        }),
        i: common_vendor.o(removeHistory),
        j: common_vendor.f(historySearch.value, (searchKeyWord, k0, i0) => {
          return {
            a: common_vendor.t(searchKeyWord),
            b: searchKeyWord,
            c: common_vendor.o(($event) => clickTab(searchKeyWord), searchKeyWord)
          };
        })
      } : {}, {
        k: common_vendor.f(hotSearch.value, (keyword, k0, i0) => {
          return {
            a: common_vendor.t(keyword),
            b: keyword,
            c: common_vendor.o(($event) => clickTab(keyword), keyword)
          };
        })
      }) : {}, {
        l: noSearch.value
      }, noSearch.value ? {
        m: common_vendor.p({
          mode: "search",
          icon: "http://cdn.uviewui.com/uview/empty/search.png"
        })
      } : common_vendor.e({
        n: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        }),
        o: noData.value || classList.value.length
      }, noData.value || classList.value.length ? {
        p: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "/Users/kuban/Desktop/wallPaper/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
