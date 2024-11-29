// 引入请求需要的类
import Service from "@/utils/service";
// 类的继承
class Request extends Service {
    //获取首页老师和课程的数据
    reqEdu() {
        return this.get({ url: '/api/edu/index' })
    }
    //获取课程接口
    reqCouse(page: number, limit: number) {
        return this.get({ url: `/api/edu/course/${page}/${limit}` })
    }
}
// 暴露Request类的实例
export default new Request;