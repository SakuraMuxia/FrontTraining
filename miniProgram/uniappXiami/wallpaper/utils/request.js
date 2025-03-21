// 可引入pinia

// 基础配置
const BASE_URL = 'https://tea.qingnian8.com/api/bizhi';

const request = (config) => {
	// 请求配置项
	const {
		// 请求接口
		url,
		// 请求体
		data = {},
		// 请求方法
		method = "GET",
		// 请求头
		header = {}
	} = config
	// 拼接url
	url = BASE_URL + url
	// 配置请求头
	header['access-key'] = "xxm123321@#"
	// 返回一个Promise对象
	return new Promise((res, rej) => {
		uni.request({
			url,
			data,
			method,
			header,
			// 成功回调
			success: (res) => {
				// 判断成功响应 代码是否为 0
				if (res.data.errCode === 0) {
					// 返回数据
					resolve(res.data)
				} else if (res.data.errCode === 400) { // 代码是否为 400
					// 提示错误  模态弹窗
					uni.showModal({
						title: "错误提示",
						content: res.data.errMsg,
						showCancel: false
					})
					// 返回失败的数据状态
					reject(res.data)
				} else { // 代码为其他 404
					// 消息提示框
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					// 返回失败的数据状态
					reject(res.data)
				}
			},
			// 失败的回调
			fail: err => {
				reject(err)
			}
		})
	})
}

export default request;