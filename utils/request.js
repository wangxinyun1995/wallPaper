const BASE_URL = "https://tea.qingnian8.com"

export function request(config={}){
    let { url, method = 'GET', data = {} } = config
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + url,
            method,
            data,
            header: {
                "access_key": "271001"
            },
            success: res => {
                if(res.data.errCode === 0){
                    resolve(res.data)
                }else if(res.data.errCode === 400){
                    uni.showModal({
                        title: '错误提示',
                        content: res.data.errMsg,
                        showCancel: false
                    })
                    reject(res.data)
                } else {
                    uni.showToast({
                        title: res.data.errMsg,
                        icon: none
                    })
                    reject(res.data)
                }
            },
            fail: err => reject(err)
        })
    })
}
