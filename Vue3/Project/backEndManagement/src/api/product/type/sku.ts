/*************获取sku列表*************/

export interface Record {
    category3Id:number,
    id?:number,
    isSale:number,
    price:number,
    skuAttrValueList:null,
    skuDefaultImg:string,
    skuDesc:string,
    skuImageList:null,
    skuName:string,
    skuSaleAttrValueList:null,
    spuId:number,
    tmId:number,
    weight:string
}

export type Records = Record[]

export interface SkuListResponseData {
    current:number,
    pages:number,
    records:Records,
    searchCount:boolean,
    size:number,
    total:number
}
