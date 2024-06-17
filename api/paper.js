import { request } from "../utils/request"
export const apiBannerList = () => {
    return request({
        url: "/api/bizhi/homeBanner"
    })
}

export const apiDayRandom = () => {
    return request({
        url: "/api/bizhi/randomWall"
    })
}

export const apiNoticeList = (data={}) => {
    return request({
        url: "/api/bizhi/wallNewsList",
        data
    })
}

export const apiCategoryList = (data={}) => {
    return request({
        url: "/api/bizhi/classify",
        data
    })
}

export const apiCategoryListItem = (data={}) => {
    return request({
        url: "/api/bizhi/wallList",
        data
    })
}

export const apiSetupScore = (data={}) => {
    return request({
        url: "/api/bizhi/setupScore",
        data
    })
}

export const apiDownlaodImage = (data={}) => {
    return request({
        url: "/api/bizhi/downloadWall",
        data
    })
}

export const apiImageDteail = (data={}) => {
    return request({
        url: "/api/bizhi/detailWall",
        data
    })
}

// 用户个人信息
export const apiUserInfo = (data={}) => {
    return request({
        url: "/api/bizhi/userInfo",
        data
    })
}

// 评分下载接口
export const apiUserHistory = (data={}) => {
    return request({
        url: "/api/bizhi/userWallList",
        data
    })
}