//引入用户相关的小仓库
import pinia from '@/stores';
import {useUserInfoStore} from '@/stores/userInfo';

//获取用户小仓库
const  userStore = useUserInfoStore(pinia);

//对外暴露一个函数
export const has = (app:any)=>{
    //生成按钮权限全局自定义指令
    //第一个参数:自定义指令的名字
    app.directive("has",{
      //当使用v-has这个全局自定义指令的DOM|组件挂载完毕的时候会立即执行一次
      //element:使用这个指令的DOM元素
      //options:能获取有自定义只有右侧数值  v-has="btn.Trademark.add"
        mounted(element:any,options:any) {
          //判断自定义指令右侧数值在仓库的buttons数组当中是否出现！！！
            if(!userStore.buttons.includes(options.value)){
            //获取当前绑定自定义指令DOM元素父组件,通过removeChild方法将当前元素删除！！！
                element.parentNode.removeChild(element);
            }
            console.log("vue ele is mounted",options)
        },
    })
}