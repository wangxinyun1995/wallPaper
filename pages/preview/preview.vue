<template>
    <view class="preview" v-if="currentInfo">
        <swiper circular :current="currentId" @change="swiperChange">
            <swiper-item v-for="(item, index) in categoryList" :key="item._id">
                <image v-if="readImages.includes(index)" @click="changeMaskShow()" :src="item.picurl" mode="aspectFill">
                </image>
            </swiper-item>
        </swiper>
        <view class="mask" v-show="maskShow">
            <view class="goBack" :style="{ top: getStatusHeight() + 'px' }" @click="goBack">
                <uni-icons type="back" color="#fff" size="20"></uni-icons>
            </view>
            <view class="count">
                {{ currentId + 1 }}/{{ categoryList.length }}
            </view>
            <view class="time">
                <uni-dateformat :date="dateNow" format="hh:mm"></uni-dateformat>
            </view>
            <view class="date">
                <uni-dateformat :date="dateNow" format="MM月dd日"></uni-dateformat>
            </view>
            <view class="footer">
                <view class="box" @click="clickInfo">
                    <uni-icons type="info" size="28"></uni-icons>
                    <view class="text">信息</view>
                </view>
                <view class="box" @click="clickScorePopup">
                    <uni-icons type="star" size="28"></uni-icons>
                    <view class="text">{{currentInfo.score}}分</view>
                </view>
                <view class="box" @click="downloadImage">
                    <uni-icons type="download" size="23"></uni-icons>
                    <view class="text">下载</view>
                </view>
            </view>
        </view>
        <uni-popup ref="infoPopup">
            <view class="popupContent">
                <view class="popupHeader">
                    <view></view>
                    <view class="title">
                        壁纸信息
                    </view>
                    <view class="close" @click="closePopup">
                        <uni-icons type="closeempty" size="18" color="#999"></uni-icons>
                    </view>
                </view>
                <scroll-view scroll-y='true' >
                    <view class="content">
                        <view class="row">
                            <view class="label">壁纸ID：</view>
                            <text selectable class="value">{{ currentInfo._id }}</text>
                        </view>
                        <!--                         <view class="row">
                            <view class="label">分类：</view>
                            <view class="text category">
                                <text selectable>{{ currentInfo. }}</text>
                            </view>
                         </view> -->
                        <view class="row">
                            <view class="label">发布者：</view>
                            <view class="text">
                                <text selectable>{{ currentInfo.nickname }}</text>
                            </view>
                        </view>
                        <view class="row">
                            <view class="label">评分：</view>
                            <view class="text rateBox">
                                <uni-rate readonly touchable :value="currentInfo.score" size="15"></uni-rate>
                                <text class="score">{{ currentInfo.score }}分</text>
                            </view>
                        </view>
                        <view class="row">
                            <view class="label">摘要：</view>
                            <view class="text">
                                <text selectable>{{ currentInfo.description }}</text>
                            </view>
                        </view>
                        <view class="row">
                            <view class="label">标签名：</view>
                            <view class="value tabs">
                                <view class="tab" v-for="tab in currentInfo.tabs" :key="tab">
                                    {{ tab }}
                                </view>
                            </view>
                        </view>
                        <view class="copyright">
                            声明：本图片来自用户投稿，非商业使用。
                        </view>
                        <view class="safe-area-inset-bottom">
                            
                        </view>
                    </view>
                </scroll-view>
            </view>
        </uni-popup>

        <!-- 评分弹窗 -->
        <uni-popup ref="scorePopup" :is-mask-click="false">
            <view class="scoreContent">
                <view class="popupHeader">
                    <view></view>
                    <view class="title">
                        {{ isScore ? '评分过了' : '壁纸评分' }}
                    </view>
                    <view class="close" @click="closeScorePopup">
                        <uni-icons type="closeempty" size="18" color="#999"></uni-icons>
                    </view>
                </view>
                <view class="scoreRate">
                    <uni-rate v-model="userScore" allowHalf :disabled="isScore" disabled-color="#FFCA3E"></uni-rate>
                    <text class="text">{{userScore}}分</text>
                </view>
                <view class="footer">
                    <button :disabled="!userScore || isScore" @click="submitScore" class="default" size="mini"
                        plain>确认评分</button>
                </view>
            </view>
        </uni-popup>
    </view>
</template>
<script setup>
    import {
        ref
    } from 'vue';
    import {
        getStatusHeight
    } from "@/utils/system.js"
    import {
        apiSetupScore,
        apiDownlaodImage,
        apiImageDteail
    } from "@/api/paper.js"
    import { onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
    const maskShow = ref(false)
    const dateNow = ref(new Date())
    const infoPopup = ref(null)
    const userScore = ref(0)
    const categoryList = ref([])
    const currentId = ref(null)
    const currentCategory = ref(null)
    const readImages = ref([])
    const currentInfo = ref(null)
    const isScore = ref(false)
    // 获取缓存的数据
    const storageCategory = uni.getStorageSync('storageCategory') || []
    categoryList.value = storageCategory.map(item => {
        return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
        }
    })

    const changeMaskShow = () => {
        maskShow.value = !maskShow.value
    }
    const clickInfo = () => {
        infoPopup.value.open('bottom')
    }

    // 关闭弹窗
    const closePopup = () => {
        infoPopup.value.close()
    }

    // 评分弹窗
    const scorePopup = ref(null)
    const clickScorePopup = () => {
        if (currentInfo.value.userScore) {
            isScore.value = true
            userScore.value = currentInfo.value.userScore
        }
        scorePopup.value.open()
    }

    const closeScorePopup = () => {
        scorePopup.value.close()
        userScore.value = 0
        isScore.value = false
    }

    const submitScore = async () => {
        uni.showLoading({
            title: "加载中..."
        })
        let {
            classid,
            _id: wallId
        } = currentInfo.value
        let res = await apiSetupScore({
            classid,
            wallId,
            userScore: userScore.value
        })
        uni.hideLoading()
        if (res.errCode === 0) {
            uni.showToast({
                title: "评分成功",
                icon: "none"
            })
            categoryList.value[currentId.value].userScore = userScore.value
            uni.setStorageSync('storageCategory', categoryList.value)
            closeScorePopup()
        }
    }

    const goBack = () => {
        uni.navigateBack({
            success: () => {
                
            },
            fail: (err) => {
                uni.reLauch({
                    url: "/pages/index/index"
                })
            }
        })
    }

    function swiperChange(e) {
        currentId.value = e.detail.current
        readImgsFun()
        currentInfo.value = categoryList.value[currentId.value]
    }

    // onLoad
    onLoad(async (e) => {
        currentCategory.value = e.id
        if(e.type == 'share'){
            let res = await apiImageDteail({ id: e.id})
            categoryList.value = res.data.map(item => {
                return {
                    ...item,
                    picurl: item.smallPicurl.replace("_small.webp", ".jpg")
                }
            })
        }
        currentId.value = categoryList.value.findIndex(item => {
            return item._id === e.id
        })
        readImgsFun()
        currentInfo.value = categoryList.value[currentId.value]
    })

    function readImgsFun() {
        readImages.value.push(
            currentId.value === 0 ? storageCategory.length - 1 : currentId.value - 1,
            currentId.value,
            currentId.value === storageCategory.length - 1 ? 0 : currentId.value + 1
        )
        readImages.value = [...new Set(readImages.value)]
    }

    const downloadImage = async () => {
        // #ifdef H5
        uni.showModal({
            content: '请长按保存壁纸',
            showCancel: false
        })

        let {
            classId,
            _id: wallId
        } = currentInfo.value
        let res = await apiDownlaodImage({
            classId,
            wallId
        })
        if (res.errCode != 0) return;
        // #endif
        // #ifndef H5
        uni.getImageInfo({
            src: currentInfo.value.picurl,
            success: (res) => {
                uni.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success: (res) => {
                        console.log(res)
                    },
                    fail: (err) => {
                        if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
                            uni.showToast({
                                title: "保存失败，请重新点击下载",
                                icon: 'none'
                            })
                            return 
                        }
                        uni.showToast({
                            title: '提示',
                            content: "需要授权保存相册",
                            success: res => {
                                if (res.comfirm) {
                                    uni.openSetting({
                                        success: (setting) => {
                                            if (setting
                                                .authSetting[
                                                    'scope.writePhotosAlbum'
                                                    ]) {
                                                uni.showToast({
                                                    title: "获取授权成功",
                                                    icon: "none"
                                                })
                                            } else {
                                                uni.showToast({
                                                    title: "获取授权失败",
                                                    icon: "none"
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
        // #endif
    }
    // 分享给好友
    onShareAppMessage((e) => {
        return {
            title: '壁纸大全',
            path: "/pages/preview/preview?id=" + currentCategory.value + "&type=share"
        }
    })
    
    // 分享朋友圈
    onShareTimeline(()=>{
        return {
            title: '壁纸大全',
            query: "id=" + currentCategory.value + "&type=share"
        }
    })
</script>
<style lang="scss" scoped>
    .preview {
        width: 100%;
        height: 100vh;

        swiper {
            width: 100%;
            height: 100%;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .mask {
            &>view {
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                color: #fff;
                width: fit-content;
            }

            .goBack {
                border: 1px solid rgba(255, 255, 255, 0.3);
                background: rgba(0, 0, 0, 0.5);
                top: 0;
                left: 30rpx;
                margin-left: 0;
                border-radius: 100rpx;
                width: 38px;
                height: 38px;
                backdrop-filter: blur(10rpx);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .count {
                top: 10vh;
                font-size: 28rpx;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 40rpx;
                padding: 8rpx 28rpx;
                backdrop-filter: blur(10rpx);
            }

            .time {
                font-size: 140rpx;
                top: calc(10vh + 80rpx);
                font-weight: 100;
                line-height: 1em;
                text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
            }

            .date {
                font-size: 34rpx;
                top: calc(10% + 230rpx);
                text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
            }

            .footer {
                background: rgba(255, 255, 255, 0.8);
                bottom: 20vh;
                width: 65vw;
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 120rpx;
                border-radius: 60rpx;
                color: #000;
                box-shadow: 0 2rpx rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(20rpx);

                .box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 2rpx 12rpx;

                    .text {
                        font-size: 26rpx;
                        color: #777;
                    }
                }
            }
        }

        .popupContent {
            background: #fff;
            padding: 30rpx;
            border-radius: 30rpx 30rpx 0 0;
            overflow: hidden;

            .popupHeader {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .title {
                    color: $text-font-color-2;
                    font-size: 26rpx;
                }

                .close {
                    padding: 6rpx;
                }
            }

            scroll-view {
                max-height: 50vh;

                .content {
                    .row {
                        display: flex;
                        padding: 16rpx 0;
                        font-size: 32rpx;
                        line-height: 1.7em;

                        .label {
                            color: $text-font-color-3;
                            min-width: 140rpx;
                            text-align: right;
                            font-size: 30rpx;
                        }

                        .value {
                            flex: 1;
                            width: 0;
                        }

                        .rateBox {
                            display: flex;
                            align-items: center;

                            .score {
                                font-size: 26rpx;
                                color: $text-font-color-2;
                                padding-left: 10rpx;
                            }
                        }

                        .tabs {
                            display: flex;
                            flex-wrap: wrap;

                            .tab {
                                border: 1px solid $brand-theme-color;
                                color: $brand-theme-color;
                                font-size: 22rpx;
                                border-radius: 40rpx;
                                padding: 10rpx 30rpx;
                                line-height: 1rem;
                                margin: 0 10rpx 10rpx 0;
                            }
                        }

                        .category {
                            color: $brand-theme-color;
                        }
                    }

                    .copyright {
                        font-size: 28rpx;
                        color: #777;
                        background: #F6F6F6;
                        padding: 20rpx;
                        border-radius: 10rpx;
                        margin: 20rpx 0;
                        line-height: 1.6rem;
                    }
                }
            }
        }

        .scoreContent {
            background: #fff;
            padding: 30rpx;
            width: 70vw;
            border-radius: 30rpx;

            .popupHeader {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .title {
                    color: $text-font-color-2;
                    font-size: 26rpx;
                }

                .close {
                    padding: 6rpx;
                }
            }

            .scoreRate {
                padding: 30rpx 0;
                display: flex;
                align-items: center;
                justify-content: center;

                .text {
                    margin-left: 10rpx;
                    color: #FFCA3E;
                    width: 80rpx;
                    line-height: 1em;
                    text-align: right;
                }
            }

            .footer {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10rpx 0;
            }
        }
    }
</style>