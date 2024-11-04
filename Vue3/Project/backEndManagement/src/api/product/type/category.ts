//分类的数据的ts类型
export interface Category {
    id: number,
    name: string,
    category1Id?: number,
    category2Id?: number
}

//分类接口返回数据数据ts类型
export type CategoryResponseData = Category[];