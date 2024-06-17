import { request } from "../utils/request"
export const apiSearchData = (data={}) => {
    return request({
        url: "/api/bizhi/searchWall",
        data
    })
}