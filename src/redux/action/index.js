/*
 * action 类型
 */

export const type = {
    SWITCH_MENU: 'SWITCH_MENU',
    SWITCH_MENU_ITEM: 'SWITCH_MENU_ITEM'
}

// 菜单点击切换，修改面包屑名称
export function switchMenu(menuName) {
    return {
        type: type.SWITCH_MENU,
        menuName
    }
}

// 菜单点击切换，修改面包屑名称
export function switchMenuItem(menuItemName) {
    console.log("menuItemName", menuItemName)
    return {
        type: type.SWITCH_MENU_ITEM,
        menuItemName
    }
}