// 获取手机系统信息
const SYSTEM_INFO = uni.getSystemInfoSync();

// 获取状态栏高度
const getStatusBarHeight = () => {
	return SYSTEM_INFO.statusBarHeight || 15
}

// 获取标题栏高度
const getTitleBarHeight = () => {
	// 如果存在 胶囊按钮
	if (uni.getMenuButtonBoundingClientRect) {
		// 获取胶囊按钮的高度和高度定位
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect();
		// 返回计算之后标题栏高度
		return height + (top - getStatusBarHeight()) * 2
	} else { // 返回40像素
		return 40;
	}
}

// 导航栏高度
const getNavBarHeight = () => {
	return getStatusBarHeight() + getTitleBarHeight()
}

// 获取左侧抖音logo宽度
const getLeftIconLeft = () => {
	// 使用条件编译
	// #ifdef MP-TOUTIAO
	// 使用头条中的api方法，获取icon的宽度
	let {
		leftIcon: {
			left,
			width
		}
	} = tt.getCustomButtonBoundingClientRect();
	return left + parseInt(width);
	// #endif
	// #ifndef MP-TOUTIAO
	return 0
	// #endif
}

// 暴漏
export {
	getStatusBarHeight,
	getTitleBarHeight,
	getNavBarHeight,
	getLeftIconLeft
}