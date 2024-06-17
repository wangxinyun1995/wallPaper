<template>
    <view class="customNavBar">
        <view class="navbar">
            <view class="statusBar" :style="{ height: getStatusHeight() + 'px' }">
            </view>
            <view class="titleBar" :style="{ height: getTitleBarHeight() + 'px' }">
                <view class="title">{{title}}</view>
                <view class="search" @click="gotoSearch">
                    <uni-icons type="search" color="#888" size="18" class="icon"></uni-icons>
                    <text class="textSearch">搜索</text>
                </view>
            </view>
        </view>
        <view class="fill" :style="{ height: getNavBarHeight() + 'px' }">
        </view>
    </view>
</template>
<script setup>
import { getStatusHeight, getTitleBarHeight, getNavBarHeight } from "@/utils/system.js"
defineProps({
    title: {
        type: String,
        default: 'wallPaper'
    }
})

const gotoSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}
</script>
<style lang="scss" scoped>
.customNavBar{
    .navbar{
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        z-index: 10;
        background:
        linear-gradient(to bottom, transparent, #fff 400rpx),
        linear-gradient(to right, #beecd8 20%, #F4E2D8);
        .statusBar{
        }
        .titleBar{
            display: flex;
            align-items: center;
            padding: 0 30rpx;
            .title{
                font-size: 22px;
                font-weight: 700;
                color: $text-font-color-1;
            }
            .search{
                width: 220rpx;
                height: 50rpx;
                border-radius: 60rpx;
                background: rgba(255,255,255,0.4);
                border: 1px solid #fff;
                margin-left: 30rpx;
                color: #999;
                font-size: 28rpx;
                display: flex;
                align-items: center;
                .textSearch{
                    padding-left: 10rpx;
                }
                .icon{
                    margin-left: 5rpx;
                }
            }
        }
    }
}
</style>