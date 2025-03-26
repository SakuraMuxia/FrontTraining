import request from "/utils/request.js";

// 分类列表
export const apiGetClassList = (data = {}) => {
	return request({
		url: "/wallList",
		data
	})
}

// 获取评分
export const apiSetScore = (data = {}) => {
	return request({
		url: "/setupScore",
		data
	})
}

// 获取下载
export const apiWriteDownload = (data = {}) => {
	return request({
		url: "/downloadWall",
		data
	})
}

// 详情壁纸
export const apiWallDetail = (data = {}) => {
	return request({
		url: "/detailWall",
		data
	})
}

// 历史列表
export const apiGetHistoryList = (data={}) => {
	return request({
		url: "/userWallList",
		data
	})
}

// 公告详情
export function apiNoticeDetail(data={}){
	return request({
		url:"/wallNewsDetail",
		data
	})
}

// 搜索接口
export function apiSearchData(data={}){
	return request({
		url:"/searchWall",
		data
	})
}