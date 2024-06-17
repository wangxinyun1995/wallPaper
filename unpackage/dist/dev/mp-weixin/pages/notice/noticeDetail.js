"use strict";
const common_vendor = require("../../common/vendor.js");
const api_notice = require("../../api/notice.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _easycom_mp_html2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "noticeDetail",
  setup(__props) {
    const detail = common_vendor.ref({});
    const getNewsDetail = async (noticeId) => {
      let res = await api_notice.NoticeDetail({
        id: noticeId
      });
      detail.value = res.data;
    };
    common_vendor.onLoad((e) => {
      if (e.title) {
        common_vendor.index.setNavigationBarTitle({
          title: e.title
        });
      }
      getNewsDetail(e.id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detail.value.select
      }, detail.value.select ? {
        b: common_vendor.p({
          text: "置顶",
          type: "error",
          inverted: true
        })
      } : {}, {
        c: common_vendor.t(detail.value.title),
        d: common_vendor.t(detail.value.author),
        e: common_vendor.p({
          date: detail.value.publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        f: common_vendor.p({
          content: detail.value.content
        }),
        g: common_vendor.t(detail.value.view_count)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-43561f04"], ["__file", "/Users/kuban/Desktop/wallPaper/pages/notice/noticeDetail.vue"]]);
wx.createPage(MiniProgramPage);
