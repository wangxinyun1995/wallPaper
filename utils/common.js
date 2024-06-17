export function formatTime(timestamp) {
  const currentTime = new Date().getTime();
  const diffTime = currentTime - timestamp;

  if (diffTime < 60 * 1000) {
    return "1分钟";
  } else if (diffTime < 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (60 * 1000))}分钟`;
  } else if (diffTime < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (60 * 60 * 1000))}小时`;
  } else if (diffTime < 30 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (24 * 60 * 60 * 1000))}天`;
  } else if (diffTime < 3 * 30 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (30 * 24 * 60 * 60 * 1000))}月`;
  } else {
    return null;
  }
}

export function gotoHome(){
    uni.showModal({
        title: "提示",
        content: "页面有误将返回",
        showCancel: false,
        success: (res) => {
            if(res.confirm){
                return uni.reLaunch({
                    url: "/pages/index/index"
                })
            }
        }
    })
}