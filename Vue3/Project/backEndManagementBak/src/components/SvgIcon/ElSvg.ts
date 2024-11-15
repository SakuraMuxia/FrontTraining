import type { App} from 'vue'
// 把element-plus的全部图标全部引入进来
import * as svg from '@element-plus/icons-vue';
// 把阿里的图标全部引入进来
import SvgIcon from '@/components/SvgIcon/index.vue'

export default function (app: App) {
  // 定义全局组件 svg-icon
  app.component('svg-icon', SvgIcon)

  // import.meta.glob('./svg/*.svg')
  // import.meta.globEager('./svg/*.svg')

  // svg是一个对象(key value形式)
  const icons = svg as any;
	for (const i in icons) {
    // 把element-plus中的图标全部注册为全局组件,名字命名为 ele-xxx
		app.component(`ele-${icons[i].name}`, icons[i]);
	}
	app.component('SvgIcon', SvgIcon);
}



