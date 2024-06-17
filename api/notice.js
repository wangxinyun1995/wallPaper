import { request } from "../utils/request"
export const NoticeDetail = (data={}) => {
    return request({
        url: "/api/bizhi/wallNewsDetail",
        data
    })
}