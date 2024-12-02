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
    // 获取某一个课程详情
    reqCourseDetail(id: string) {
        return this.get({ url: `/api/edu/course/${id}` })
    }
    //获取某一个课程的评价
    reqComment(page: number, limit: number, courseId: string) {
        return this.get({ url: `/api/edu/comment/${page}/${limit}?courseId=${courseId}` })
    }
    //收藏
    reqSave(courseId:string){
        return this.post({url:`/api/edu/courseCollect/auth/save/${courseId}`})
    }

    //取消收藏
    reqDeleteSave(id:string){
        return this.delete({url:`/api/edu/courseCollect/auth/remove/${id}`})
    }

    //添加评论
    reqAddComment(data:any){
          return this.post({url:`/api/edu/comment/auth/save`,data});
    }

    // 根据临时凭证code获取token
    reqToken(code: string) {
        return this.get({ url: `/api/ucenter/webChat/callback?code=${code}` });
    }
    
    //根据token获取用户信息
    reqUserInfo() {
        return this.get({ url: `/api/ucenter/member/auth/getLoginInfo` });
    }
    //获取视频学习的地址
    reqPlayUrl(videoSourceId:string){
        return this.get({url:`/api/vod/video/getPlayURL/${videoSourceId}`})
    }
}
// 暴露Request类的实例
export default new Request;