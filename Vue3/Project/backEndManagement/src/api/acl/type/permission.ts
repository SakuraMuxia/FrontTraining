/* 
权限数据
*/
export interface PermissionModel {
    id?: string; 
    pid?: string; // 上一级id 
    code?: string; // 按钮id
    select?: boolean; // 是否勾选
    toCode?: string; // 
    children?: PermissionListModel; // 是否是菜单
    name: string; // 名字
    level: PermissionLevelModel; // 等级
    type: 1 | 2; // 类型
}

// 1. 树行表格
//    * table展示数据menuPermissionList, 每一行是一个row, 需要数据有 row 中包含 children
//    * 需要给 el-table 组件设置 row-key 属性, row-key属性的作用作为表格中数据的唯一标识
//      row-key="id" ---->   将 row(每行展示的数据)中的字段 id 作为这一行数据的唯一标识
//    * expand-row-keys 设置表格默认展开的是哪一行
//      expand-row-keys 这个的属性值是一个数组,数字中放需要展开行的 row-key 标识(唯一标识)
//      expand-row-keys="menuPermissionList[0].id"
// 2. 保存数据
// level 字段 代表的是等级的意思
// level 支持 1, 2, 3, 4
//    1, 2, 3 代表的都是菜单,此时type值应该是1
//    4 代表的是按钮,此时type值应该是2
// type值是1,代表的是菜单,最后拥有这个权限的时候,数据会展示在当前用户返回的个人信息的 routes 中
// type值是2,代表的是按钮,最后拥有这个权限的时候,数据会展示在当前用户返回的个人信息的 buttons 中

// 权限等级
export type PermissionLevelModel = 0 | 1 | 2 | 3 | 4

// 权限列表
export type PermissionListModel = PermissionModel[]

// 权限列表接口返回的数据
export interface PermissionListResponseModel {
    children: PermissionListModel;
}