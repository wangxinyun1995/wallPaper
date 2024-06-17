"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_paper = require("../../api/paper.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskShow = common_vendor.ref(false);
    const dateNow = common_vendor.ref(/* @__PURE__ */ new Date());
    const infoPopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const categoryList = common_vendor.ref([]);
    const currentId = common_vendor.ref(null);
    const currentCategory = common_vendor.ref(null);
    const readImages = common_vendor.ref([]);
    const currentInfo = common_vendor.ref(null);
    const isScore = common_vendor.ref(false);
    const storageCategory = common_vendor.index.getStorageSync("storageCategory") || [];
    categoryList.value = storageCategory.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const changeMaskShow = () => {
      maskShow.value = !maskShow.value;
    };
    const clickInfo = () => {
      infoPopup.value.open("bottom");
    };
    const closePopup = () => {
      infoPopup.value.close();
    };
    const scorePopup = common_vendor.ref(null);
    const clickScorePopup = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const closeScorePopup = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let res = await api_paper.apiSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        categoryList.value[currentId.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storageCategory", categoryList.value);
        closeScorePopup();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: (err) => {
          common_vendor.index.reLauch({
            url: "/pages/index/index"
          });
        }
      });
    };
    function swiperChange(e) {
      currentId.value = e.detail.current;
      readImgsFun();
      currentInfo.value = categoryList.value[currentId.value];
    }
    common_vendor.onLoad(async (e) => {
      currentCategory.value = e.id;
      if (e.type == "share") {
        let res = await api_paper.apiImageDteail({ id: e.id });
        categoryList.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentId.value = categoryList.value.findIndex((item) => {
        return item._id === e.id;
      });
      readImgsFun();
      currentInfo.value = categoryList.value[currentId.value];
    });
    function readImgsFun() {
      readImages.value.push(
        currentId.value === 0 ? storageCategory.length - 1 : currentId.value - 1,
        currentId.value,
        currentId.value === storageCategory.length - 1 ? 0 : currentId.value + 1
      );
      readImages.value = [...new Set(readImages.value)];
    }
    const downloadImage = async () => {
      common_vendor.index.getImageInfo({
        src: currentInfo.value.picurl,
        success: (res) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.path,
            success: (res2) => {
              console.log(res2);
            },
            fail: (err) => {
              if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                common_vendor.index.showToast({
                  title: "保存失败，请重新点击下载",
                  icon: "none"
                });
                return;
              }
              common_vendor.index.showToast({
                title: "提示",
                content: "需要授权保存相册",
                success: (res2) => {
                  if (res2.comfirm) {
                    common_vendor.index.openSetting({
                      success: (setting) => {
                        if (setting.authSetting["scope.writePhotosAlbum"]) {
                          common_vendor.index.showToast({
                            title: "获取授权成功",
                            icon: "none"
                          });
                        } else {
                          common_vendor.index.showToast({
                            title: "获取授权失败",
                            icon: "none"
                          });
                        }
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸大全",
        path: "/pages/preview/preview?id=" + currentCategory.value + "&type=share"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸大全",
        query: "id=" + currentCategory.value + "&type=share"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? {
        b: common_vendor.f(categoryList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImages.value.includes(index)
          }, readImages.value.includes(index) ? {
            b: common_vendor.o(($event) => changeMaskShow(), item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: currentId.value,
        d: common_vendor.o(swiperChange),
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.unref(utils_system.getStatusHeight)() + "px",
        g: common_vendor.o(goBack),
        h: common_vendor.t(currentId.value + 1),
        i: common_vendor.t(categoryList.value.length),
        j: common_vendor.p({
          date: dateNow.value,
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: dateNow.value,
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(clickInfo),
        n: common_vendor.p({
          type: "star",
          size: "28"
        }),
        o: common_vendor.t(currentInfo.value.score),
        p: common_vendor.o(clickScorePopup),
        q: common_vendor.p({
          type: "download",
          size: "23"
        }),
        r: common_vendor.o(downloadImage),
        s: maskShow.value,
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(closePopup),
        w: common_vendor.t(currentInfo.value._id),
        x: common_vendor.t(currentInfo.value.nickname),
        y: common_vendor.p({
          readonly: true,
          touchable: true,
          value: currentInfo.value.score,
          size: "15"
        }),
        z: common_vendor.t(currentInfo.value.score),
        A: common_vendor.t(currentInfo.value.description),
        B: common_vendor.f(currentInfo.value.tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab
          };
        }),
        C: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        D: common_vendor.t(isScore.value ? "评分过了" : "壁纸评分"),
        E: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        F: common_vendor.o(closeScorePopup),
        G: common_vendor.o(($event) => userScore.value = $event),
        H: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        I: common_vendor.t(userScore.value),
        J: !userScore.value || isScore.value,
        K: common_vendor.o(submitScore),
        L: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        M: common_vendor.p({
          ["is-mask-click"]: false
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "/Users/kuban/Desktop/wallPaper/pages/preview/preview.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
