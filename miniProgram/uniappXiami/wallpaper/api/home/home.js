import request from "/utils/request.js";

// banner
export function apiGetBanner() {
	return request({
		url: "/homeBanner"
	})
}
// 推荐图
export function apiGetDayRandom() {
	return request({
		url: "/randomWall"
	})
}
// 公告
export function apiGetNotice(data = {}) {
	return request({
		url: "/wallNewsList",
		data
	})
}
// 分类
export const apiGetClassify = (data={}) => request({
	url:"/classify",
	data
})