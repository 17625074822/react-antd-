/**
 * reducer
 */

import {type} from '../action';

const ebikeData = (state, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            console.log("action.menuName", action.menuName)
            return {
                ...state,
                menuName: action.menuName
            };
        case type.SWITCH_MENU_ITEM:
            console.log("action.menuItemName", action.menuItemName)
            return {
                ...state,
                menuItemName: action.menuItemName
            };
        default:
            return {...state};
    }
};

export default ebikeData;