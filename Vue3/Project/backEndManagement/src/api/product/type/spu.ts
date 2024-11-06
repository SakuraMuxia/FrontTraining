//代表已有的SPU数据类型
export interface SpuObj {
    id?: number,//SPU的ID
    category3Id: string | number,//三级分类的ID
    spuName: string,//SPU的名字
    description: string,//SPU的描述
    tmId: number|string,//品牌的ID
    spuImageList?:null,//已有的SPU照片墙的数据(目前不知道数据类型)
    spuSaleAttrList?:null,//已有的SPU销售属性的数据(目前不知道数据类型)
}

//存储已有的SPU(数组)
export type SpuObjArr = SpuObj[];

//SPU列表返回的数据的TS类型
export interface SpuListResponseData {
    records: SpuObjArr,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
}

// SPU 品牌ts类型
export interface TradeMarkObj{
    id:number,
    tmName:string,
    logoUrl:string
}

export type TradeMarkArr = TradeMarkObj[];

// SPU 照片墙ts类型
export interface ImgObj{
    id?:number,
    spuId?:number,

    imgName?:string,
    imgUrl?:string,

    name?:string,
    url?:string,
}

export type ImageArr = ImgObj[];

// 销售属性ts类型 
    // 销售属性值对象类型
export interface SaleAttrValueObj{
    id?:number,
    spuId?:number,
    baseSaleAttrId:number,
    saleAttrValueName:string,
    saleAttrName?:string,
    isChecked:null
}
    // 销售属性值数组类型
export type SaleAttrValueArr = SaleAttrValueObj[];
    // 销售属性对象类型
export interface SaleAttrObj{
    id?:number,
    spuId?:number,
    baseSaleAttrId?:number,
    saleAttrName?:string,
    spuSaleAttrValueList?:SaleAttrValueArr ,
    showInput?:boolean,
}
    // 销售属性数组类型
export type SaleAttrArr =SaleAttrObj[]

// 销售属性属性名
export interface SaleAttrNameObj{
    id:number,
    name:string
}
export type SaleAttrNameArr =SaleAttrNameObj[];