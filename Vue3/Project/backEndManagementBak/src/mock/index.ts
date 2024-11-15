//引入mock
//@ts-ignore
import Mock from 'mockjs';
import data from './data.json';
//创建首页模块接口
//第一个参数:接口地址  第二个参数:接口返回的数据
Mock.mock("/mock/home",{code:200,data});