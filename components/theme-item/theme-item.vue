<template>
    <view class="themeItem">
        <navigator :url="'/pages/category-list/category-list?id=' + item._id + '&name=' + item.name" class="box" v-if="!isMore">
            <image class="pic" :src="item.picurl" mode="aspectFill"></image>
            <view class="mask">{{ item.name }}</view>
            <view class="tab" v-if="formatTime(item.updateTime)">{{ formatTime(item.updateTime) }}前更新</view>
        </navigator>
        <navigator url="/pages/category/category" open-type="reLaunch" class="box more" v-else>
            <image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
            <view class="mask">
                 <view class="text">更多</view>
            </view>
        </navigator>
    </view>
</template>

<script setup>
import { formatTime } from "@/utils/common.js"
defineProps({
    isMore: {
        type: Boolean,
        default: false
    },
    item: {
        type: Object,
        default(){
            return {
                name: '动物世界',
                picurl: "../../common/images/classify1.jpg",
                updateTime: Date.now()
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.themeItem{
    .box{
        height: 340rpx;
        border-radius: 10rpx;
        overflow: hidden;
        position: relative;
        .pic{
            width: 100%;
            height: 100%;
        }
        .mask{
            height: 70rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center; 
            color: #fff;
            background: rgba(0,0,0,0.2);
            backdrop-filter: blur(20rpx);
            font-weight: 600;
        }
        .tab{
            position: absolute;
            top: 0;
            left: 0;  
            background: rgba(250, 129, 90, 0.7);
            backdrop-filter: blur(20rpx);
            color: #fff;
            font-size: 22rpx;
            padding: 6rpx 14rpx;
            border-radius: 0 0 20rpx 0;
            transform: scale(0.8);
            transform-origin: left top;
        }
    }
    .box.more{
        .mask{
            weight: 100%;
            height: 100%;
            flex-direction: column;
        }
        .text{
            font-size: 28rpx;
        }
    }
}
</style >