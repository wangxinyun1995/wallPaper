<template>
    <view class="userLayout pageBg" v-if="userInfo">
        <view :style="{ height: getNavBarHeight() + 'px' }">
        </view>
        <view class="userInfo">
            <view class="avatar">
                <image src="../../common/images/xxmLogo.png" mode="aspectFill"></image>
            </view>
            <view class="ip">{{ userInfo.IP }}</view>
            <view class="address">来自于：{{ userInfo.address.city || userInfo.address.province || userInfo.address.country}}</view>
        </view>
        <view class="section">
            <view class="list">
                <navigator url="/pages/category-list/category-list?name=我的下载&type=download">
                    <view class="row">
                        <view class="left brandColor">
                            <uni-icons type="download-filled" size="20"></uni-icons>
                            <view class="text">我的下载</view>
                        </view>
                        <view class="right">
                            <view class="text">{{ userInfo.downloadSize }}</view>
                            <uni-icons type="right" size="15" color="#aaa" ></uni-icons>
                        </view>
                    </view>
                </navigator>
                <navigator url="/pages/category-list/category-list?name=我的评分&type=score">
                    <view class="row">
                        <view class="left brandColor">
                            <uni-icons type="star-filled" size="20"></uni-icons>
                            <view class="text">我的评分</view>
                        </view>
                        <view class="right">
                            <view class="text">{{ userInfo.scoreSize }}</view>
                            <uni-icons type="right" size="15" color="#aaa" ></uni-icons>
                        </view>
                    </view>
                </navigator>
                <view class="row">
                    <view class="left brandColor">
                        <uni-icons type="chatboxes-filled" size="20"></uni-icons>
                        <view class="text">联系客服</view>
                    </view>
                    <view class="right">
                        <view class="text"></view>
                        <uni-icons type="right" size="15" color="#aaa" ></uni-icons>
                    </view>
                    <!-- #ifdef MP -->
                        <button open-type="contact">联系客服</button>           
                    <!-- #endif -->
                    <!-- #ifndef MP -->
                        <button @click="clickContact">拨打电话</button>
                    <!-- #endif -->
                </view>
            </view>
        </view>
        <view class="section">
            <view class="list">
                <navigator url="/pages/notice/noticeDetail?id=653507c6466d417a3718e94b&title=订阅更新">
                    <view class="row">
                        <view class="left brandColor">
                            <uni-icons type="notification-filled" size="20"></uni-icons>
                            <view class="text">订阅更新</view>
                        </view>
                        <view class="right">
                            <view class="text"></view>
                            <uni-icons type="right" size="15" color="#aaa" ></uni-icons>
                        </view>
                    </view>
                </navigator>
                <navigator url="/pages/notice/noticeDetail?id=6536358ce0ec19c8d67fbe82&title=常见问题">
                    <view class="row">
                        <view class="left brandColor">
                            <uni-icons type="flag-filled" size="20"></uni-icons>
                            <view class="text">常见问题</view>
                        </view>
                        <view class="right">
                            <view class="text"></view>
                            <uni-icons type="right" size="15" color="#aaa" ></uni-icons>
                        </view>
                    </view>
                </navigator>
            </view>
        </view>
    </view>
    <view class="loadingLayout" v-else>
        <view :style="{ height: getNavBarHeight() + 'px' }">
        </view>
        <uni-load-more status="loading"></uni-load-more>
    </view>
</template>
<script setup>
import { getNavBarHeight } from "@/utils/system.js"
import { apiUserInfo } from "@/api/paper.js"
import { ref } from "vue";
const userInfo = ref(null)
const clickContact = () => {
    uni.makePhoneCall({
        phoneNumber: "18224064523"
    })
}

const getUserInfo = async () => {
    let res = await apiUserInfo()
    userInfo.value = res.data
}
getUserInfo()
</script>
<style lang="scss" scoped>
.userLayout{
    .userInfo{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50rpx 0;
        .avatar{
             width: 160rpx;
             height: 160rpx;
             border-radius: 50%;
             overflow: hidden;
             image{
                 width: 100%;
                 height: 100%;
             }
        }
        .ip{
            font-size: 44rpx;
            color: #333;
            padding: 20rpx 0 5rpx;
        }
        .address{
            font-size: 28rpx;
            color: #aaa;
        }
    }
    .section{
        width: 690rpx;
        margin: 50rpx auto;
        border: 1px solid #eee;
        border-radius: 10rpx;
        border-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
        background: #fff;
        .list{
            .row{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 30rpx;
                height: 100rpx;
                border-bottom: 1px solid #eee;
                position: relative;
                &:last-child{
                    border-bottom: none;
                }
                .left{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .text{
                        padding-left: 20rpx;
                        color: #666;
                    }
                }
                .right{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .text{
                        font-size: 24rpx;
                        color: #aaa;
                    }
                }
                button{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    opacity: 0;
                }
            }
        }
    }
}  
</style>