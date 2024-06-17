<template>
    <view class="searchLayout">
        <view class="search">
            <uni-search-bar focus placeholder="搜索" v-model="queryParams.keyword" @confirm="onSearch" @cancel="onClear" @clear="onClear">
            </uni-search-bar>
        </view>
        <view v-if="!classList.length || noSearch">
            <view class="history" v-if="historySearch.length">
                <view class="topTitle">
                    <view class="text">最近搜索</view>
                    <view class="icon" @click="removeHistory">
                        <uni-icons type="trash" size='25'></uni-icons>
                    </view>
                </view>
                <view class="tabs">
                    <view class="tab" v-for="searchKeyWord in historySearch" :key="searchKeyWord" @click="clickTab(searchKeyWord)">{{ searchKeyWord }}</view>
                </view>
            </view>
            <view class="recommend">
                <view class="topTitle">
                    <view class="text">热门搜索</view>
                </view>
                <view class="tabs">
                    <view class="tab" v-for="keyword in hotSearch" :key="keyword" @click="clickTab(keyword)">{{ keyword }}</view>
                </view>
            </view>
        </view>
        <view class="noSearch" v-if="noSearch">
            <uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
        </view>
        <view v-else>
            <view class="listContent">
                <navigator :url="`/pages/preview/preview?id=${item._id}`"  class="item" 
                v-for="item in classList" :key="item._id">				
                    <image :src="item.smallPicurl" mode="aspectFill"></image>				
                </navigator>
            </view>
            <view class="loadingLayout" v-if="noData || classList.length">
                <uni-load-more :status="noData? 'noMore':'loading'" />
            </view>
        </view>
    </view>
</template>
<script setup>
import { ref } from 'vue';
import { apiSearchData } from '@/api/search.js';
import { onReachBottom, onUnload } from '@dcloudio/uni-app'
// 查询参数
const queryParams = ref({
    pageNum: 1,
    pageSize: 12,
    keyword: ''
})
// 搜索历史词
const historySearch = ref(uni.getStorageSync('historySearch') || [])
// 热门搜索词
const hotSearch = ref(["美女","帅哥","宠物","卡通"])
// 搜索结果列表
const classList = ref([])
//没有更多
const noData = ref(false);
//没有搜索结果
const noSearch = ref(false);
// 点击搜索
const onSearch = () => {
    if(queryParams.value.keyword.length === 0){
        return uni.showModal({
            title: "请输入搜索关键字"
        })
    }
    uni.showLoading()
    historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10)
    uni.setStorageSync('historySearch', historySearch.value)
    initQueryParams(queryParams.value.keyword)
    // 搜索数据
    searchData()
}
// 搜索数据
const searchData = async () => {
  try{
      let res = await apiSearchData(queryParams.value)
      classList.value = [...classList.value, ...res.data]
      uni.setStorageSync('storageCategory', classList.value)
      if(queryParams.value.pageSize > res.data.length) noData.value = true;
      if(res.data.length == 0 && classList.value.length == 0) noSearch.value = true
  }finally{
      uni.hideLoading()
  }
}

// 点击标签进行搜索
const clickTab = (value) => {
    initQueryParams(value)
    onSearch()
}

const initQueryParams = (value='') => {
    classList.value = []
    noData.value = false
    noSearch.value = false
    queryParams.value = {
        pageNum: 1,
        pageSize: 12,
        keyword: value
    }
}
// 触底加载
onReachBottom(() => {
    if(noData.value) return
    queryParams.value.pageNum++
    searchData()
})
// 关闭所有页面
onUnload(() => {
    uni.removeStorageSync("storgClassList", classList.value)
})

// 点击清除按钮
const onClear = () => {
    initQueryParams()
}

//点击清空搜索记录
const removeHistory = () => {
    uni.showModal({
        title: '是否情况历史记录',
        success: (res) => {
            if(res.confirm){
                uni.removeStorageSync('historySearch')
                historySearch.value = []
            }
        }
    })
}
</script>
<style lang="scss" scoped>
.searchLayout{
    .search{
        padding: 0 10rpx;
    }
    .history{
        padding: 30rpx;
    }
    .recommend {
        padding: 30rpx;
    }
    .topTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 32rpx;
        color: #999;
    }
    .tabs{
        display: flex;
        flex-wrap: wrap;
        padding-top: 20rpx;
        .tab{
            padding: 10rpx 28rpx;
            font-size: 28rpx;
            color: #333;
            background: #F4F4F4;
            border-radius: 50rpx;
            margin-right: 20rpx;
            margin-top: 20rpx;
        }
    }
    .listContent{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 5rpx;
        padding:20rpx 5rpx;		
        .item{
            height: 440rpx;
            image{
                width: 100%;
                height: 100%;
                display: block;
            }			
        }		
    }
}
</style>
