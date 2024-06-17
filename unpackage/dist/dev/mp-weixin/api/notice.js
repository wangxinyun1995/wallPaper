"use strict";
const utils_request = require("../utils/request.js");
const NoticeDetail = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/wallNewsDetail",
    data
  });
};
exports.NoticeDetail = NoticeDetail;
