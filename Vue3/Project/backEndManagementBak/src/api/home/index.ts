// 导入requestMock对象
import requestMock from '@/utils/requestMock';
//首页数据报表接口地址
export const reqCharts = () => requestMock.get("/home");