import Service from "@/utils/request";

class Request extends Service{
	// 发送点击请求
	reqBrightScreen(data:any){
		return this.post({
			url:'/api/Command',
			data:data
		})
	}
}