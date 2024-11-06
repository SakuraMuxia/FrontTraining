//代表已有的SPU数据类型
export interface Spu {
    id?: number,//SPU的ID
    category3Id: string | number,//三级分类的ID
    spuName: string,//SPU的名字
    description: string,//SPU的描述
    tmId: number|string,//品牌的ID
    spuImageList?:null,//已有的SPU照片墙的数据(目前不知道数据类型)
    spuSaleAttrList?:null,//已有的SPU销售属性的数据(目前不知道数据类型)
}

//存储已有的SPU(数组)
export type Records = Spu[];

//SPU列表返回的数据的TS类型
export interface SpuListResponseData {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
}

