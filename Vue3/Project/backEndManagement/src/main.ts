// vue3提供的createApp函数:用于创建应用(app)
import { createApp } from 'vue'
const app = createApp(App)
// pinia仓库
import pinia from './stores'
// vue3中的PC端的组件库 element-plus
// vue3中的移动端的组件库 vant
import ElementPlus from 'element-plus'
// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 引入根组件
import App from './App.vue'
// vue-router管理项目路由[首页,登陆,404]
import router from './router'
// 引入全局样式
import './styles/index.scss'
// 引入ElSvg函数
import ElSvg from './components/SvgIcon/ElSvg'

// 路由鉴权
import './permission'

//引入分类全局组件
import Category from '@/components/Category/index.vue';

// 引入mock
import './mock';

// 引入vue-echarts
import VueEcharts from 'vue-echarts'
app.component('v-chart',VueEcharts);

// 引入全局组件 category
//第一个参数:全局的名字 第二个参数:组件
app.component('Category', Category);

//引入自定义指令文件函数
import {has} from '@/utils/directive';
has(app);
// 把 element-plus 阿里图标全部注册为全局组件
ElSvg(app)
// 注册大仓库
app.use(pinia)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app')
