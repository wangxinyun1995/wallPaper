"use strict";
const utils_request = require("../utils/request.js");
const apiBannerList = () => {
  return utils_request.request({
    url: "/api/bizhi/homeBanner"
  });
};
const apiDayRandom = () => {
  return utils_request.request({
    url: "/api/bizhi/randomWall"
  });
};
const apiNoticeList = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/wallNewsList",
    data
  });
};
const apiCategoryList = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/classify",
    data
  });
};
const apiCategoryListItem = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/wallList",
    data
  });
};
const apiSetupScore = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/setupScore",
    data
  });
};
const apiImageDteail = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/detailWall",
    data
  });
};
const apiUserInfo = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/userInfo",
    data
  });
};
const apiUserHistory = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/userWallList",
    data
  });
};
exports.apiBannerList = apiBannerList;
exports.apiCategoryList = apiCategoryList;
exports.apiCategoryListItem = apiCategoryListItem;
exports.apiDayRandom = apiDayRandom;
exports.apiImageDteail = apiImageDteail;
exports.apiNoticeList = apiNoticeList;
exports.apiSetupScore = apiSetupScore;
exports.apiUserHistory = apiUserHistory;
exports.apiUserInfo = apiUserInfo;
