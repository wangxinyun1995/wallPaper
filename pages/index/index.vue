<template>
  <view class="content pageBg">
      <custom-nav-bar :title="title"></custom-nav-bar>
      <view class="banner">
          <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
              <swiper-item v-for="item in bannerList" :key="item._id">
                  <navigator :url="`/pages/category-list/category-list?${item.url}`" class="bannerLink">
                      <image :src="item.picurl" mode="aspectFill"/>
                  </navigator>
              </swiper-item>
          </swiper>
      </view>
      <view class="notice">
          <view class="left brandColor">
              <uni-icons type="sound-filled" size="20"></uni-icons>
              <text class="text">公告</text>
          </view>
          <view class="center">
              <swiper vertical autoplay interval="1500" duration="300" circular>
                  <swiper-item v-for="item in noticeList" :key="item._id" @click="goNotice(item._id)">
                      {{ item.title }}
                  </swiper-item>
              </swiper>
          </view>
          <view class="right">
              <uni-icons type="right" size="16" color="#333 "></uni-icons>
          </view>
      </view>
      <view class="select">
          <common-title>
              <template #name>
                  每日推荐
              </template>
              <template #custom>
                  <view class="date brandColor">
                      <uni-icons type="calendar" size="20"></uni-icons>
                      <view class="text">
                          <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
                      </view>
                  </view>
              </template>
          </common-title>
          <view class="select-content">
              <scroll-view scroll-x="true" >
                  <view class="box" v-for="item in dateList" :key="item._id" @click="goPreview(item._id)">
                     <image :src="item.smallPicurl" mode="aspectFill"></image>
                  </view>
              </scroll-view>
          </view>
      </view>
      <view class="theme">
          <common-title>
              <template #name>
                  专题精选
              </template>
              <template #custom>
                   <navigator url="/pages/category/category" open-type="reLaunch" class="more">More+</navigator>
              </template>
          </common-title>
          <view class="theme-content">
              <theme-item v-for="item in categoryList" :key="item.id" :item="item"></theme-item>
              <theme-item :isMore='true'></theme-item>
          </view>
      </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { apiBannerList, apiDayRandom, apiNoticeList, apiCategoryList } from '@/api/paper.js'
// 获取banner
const bannerList = ref([])
const dateList = ref([])
const noticeList = ref([])
const categoryList = ref([])
const getBannerList = async () => {
    let res = await apiBannerList();
    bannerList.value = res.data
}

const getDayRandom = async () => {
    let res = await apiDayRandom()
    dateList.value = res.data
}

const getNoticeList = async () => {
    // let params = { select: true }
    let params = { }
    let res = await apiNoticeList(params)
    noticeList.value = res.data
}

const getCategoryList = async () => {
    let params = { select: true }
    let res = await apiCategoryList(params)
    categoryList.value = res.data
}

// 分享给好友
onShareAppMessage((e) => {
    return {
        title: '壁纸大全',
        path: "/pages/index/index"
    }
})

// 分享朋友圈
onShareTimeline(()=>{
    return {
        title: '壁纸大全',
        imageUrl: "/static/logo.png"
    }
})

getNoticeList()
getBannerList()
getDayRandom()
getCategoryList()
const title = ref("推荐")
const goPreview = (itemId) => {
    uni.setStorageSync('storageCategory', dateList.value)
    uni.navigateTo({
        url: '/pages/preview/preview?id=' + itemId
    })
}

const goNotice = (itemId) => {
    uni.navigateTo({
        url: "/pages/notice/noticeDetail?id=" + itemId
    })
}
</script>

<style lang="scss" scoped>
.content{
    width: 100vw;
    height: 100vh;
    .banner{
        padding: 30rpx 0;
        width: 750rpx;
        swiper{
          width: 750rpx;
          height: 340rpx;
          padding: 0 30rpx;
          box-sizing: border-box;
          &-item{
              width: 100%;
              height: 100%;
              .bannerLink{
                  width: 100%;
                  height: 100%;
                  image{
                      width: 100%;
                      height: 100%;
                      border-radius: 20rpx;
                  }
              }
          }
        }
    }
    .notice{
         width: 690rpx;
         height: 80rpx;
         background: #f9f9f9;
         margin: 0 auto;
         line-height: 80rpx;
         border-radius: 80rpx;
         display: flex;
         .left{
             width: 140rpx;
             display: flex;
             justify-content: center;
             align-items: center;
             .text{
                 color: #28b380; 
                 font-weight: 600;
                 font-size: 28rpx;
             }
         }
         .center{
             flex: 1;
             swiper{
                 height: 100%;
                 &-item{
                     height: 100%;
                     font-size: 30rpx;
                     color: #666;
                     overflow: hidden;
                     white-space: nowrap;
                     text-overflow: ellipsis;
                 }
             }
         }
         .right{
             width: 70rpx;
             display: flex;
             justify-content: center;
             align-items: center;
         }
    }
    .select{
        padding-top: 50rpx;
        .date{
            color: $brand-theme-color;
            display: flex;
            justify-content: center;
            align-items: center;
            .text{
                margin-left: 5rpx;
            }
        }
        .select-content{
            width: 720rpx;
            margin-left: 30rpx;
            margin-top: 30rpx;
            scroll-view{
                white-space: nowrap;
                .box{
                   width: 200rpx;
                   height: 430rpx;
                   display: inline-block;
                   margin-right: 15rpx;
                   image{
                       width: 100%;
                       height: 100%;
                       border-radius: 10rpx;
                   }
                }
                .box:last-child{
                    margin-right: 30rpx;
                }
            }
        }
    }
    .theme{
        padding: 50rpx 0;
        .more{
            font-size: 32rpx;
            color: #888;
        }
        &-content{
            margin-top: 30rpx;
            padding: 0 30rpx;
            display: grid;
            gap: 15rpx;
            grid-template-columns: repeat(3, 1fr);
        }
    }
}
</style>
