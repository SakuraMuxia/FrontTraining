//属性值的ts类型
export interface AttrValue {
    id?: number,
    valueName: string,
    attrId?: number,
    showInput?:boolean
}

// 属性值列表类型
export type AttrValueList = AttrValue[];

// 属性的类型
export interface Attr {
    id?: number,
    attrName: string,
    categoryId: number|string,
    categoryLevel: number|string,
    attrValueList: AttrValueList
}

// 属性列表类型
export type AttrResponseData = Attr[];