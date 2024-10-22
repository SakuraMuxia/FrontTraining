import {mzlist, mzinfo} from '@/request/mz'

// 获取三个热映的电影
const getMessage = () => {
    return mzlist.get('/gateway?cityId=440300&pageNum=1&pageSize=3&type=1&k=93408')
}

// 根据ID获取电影详情
const getMessageDetails = (filmId) => {
    return mzinfo.get('/gateway?filmId=' + filmId +'&k=7455076')
}

export {
    getMessage,
    getMessageDetails
}