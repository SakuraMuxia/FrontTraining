// timestamp 发布者发布的时间戳
const compareTimestamp = (timestamp) => {
	// 获取当前时间戳
	const currentTime = new Date().getTime();
	// 时间时间间隔
	const timeDiff = currentTime - timestamp;

	if (timeDiff < 60000) {
		return '1分钟内';
	} else if (timeDiff < 3600000) {
		return Math.floor(timeDiff / 60000) + '分钟';
	} else if (timeDiff < 86400000) {
		return Math.floor(timeDiff / 3600000) + '小时';
	} else if (timeDiff < 2592000000) {
		return Math.floor(timeDiff / 86400000) + '天';
	} else if (timeDiff < 7776000000) { // 3个月内返回 
		return Math.floor(timeDiff / 2592000000) + '月';
	} else { // 超过3个月返回null
		return null;
	}
}

// 回到首页
const gotoHome = () => {
	uni.showModal({
		title:"提示",
		content:"页面有误将返回首页",
		showCancel:false,
		// 确定回调
		success:(res)=>{
			if(res.confirm){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	})
}

// 获取localStorage中的数据
const getStorageClassList = () => {
	return uni.getStorageSync("storgClassList") || []
}

export {
	compareTimestamp,
	gotoHome,
	getStorageClassList
}