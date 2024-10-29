// 引入创建大仓库的方法 createPinia
import { createPinia } from 'pinia';
// 创建大仓库
const pinia = createPinia();
// 对外默认暴漏
export default pinia;