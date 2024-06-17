"use strict";
require("../common/vendor.js");
function formatTime(timestamp) {
  const currentTime = (/* @__PURE__ */ new Date()).getTime();
  const diffTime = currentTime - timestamp;
  if (diffTime < 60 * 1e3) {
    return "1分钟";
  } else if (diffTime < 60 * 60 * 1e3) {
    return `${Math.floor(diffTime / (60 * 1e3))}分钟`;
  } else if (diffTime < 24 * 60 * 60 * 1e3) {
    return `${Math.floor(diffTime / (60 * 60 * 1e3))}小时`;
  } else if (diffTime < 30 * 24 * 60 * 60 * 1e3) {
    return `${Math.floor(diffTime / (24 * 60 * 60 * 1e3))}天`;
  } else if (diffTime < 3 * 30 * 24 * 60 * 60 * 1e3) {
    return `${Math.floor(diffTime / (30 * 24 * 60 * 60 * 1e3))}月`;
  } else {
    return null;
  }
}
exports.formatTime = formatTime;
