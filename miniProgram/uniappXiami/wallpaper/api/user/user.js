import request from "/utils/request.js";

export function apiUserInfo(data={}){
	return request({
		url:"/userInfo",
		data
	})
}