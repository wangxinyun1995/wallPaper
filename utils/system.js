const SYSTEM = uni.getSystemInfoSync()
export const getStatusHeight = () => SYSTEM.statusBarHeight || 15;

export const getTitleBarHeight = () => {
    if(uni.getMenuButtonBoundingClientRect){
        let { top, height } = uni.getMenuButtonBoundingClientRect()
        return height + (top - getStatusHeight()) * 2
    }else{
        return 40
    }
}

export const getNavBarHeight = () => {
    return getTitleBarHeight() + getStatusHeight()
}