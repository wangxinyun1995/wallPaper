"use strict";
const utils_request = require("../utils/request.js");
const apiSearchData = (data = {}) => {
  return utils_request.request({
    url: "/api/bizhi/searchWall",
    data
  });
};
exports.apiSearchData = apiSearchData;
