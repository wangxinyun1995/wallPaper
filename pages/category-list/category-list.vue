<template>
    <view class="loadingLayout" v-if="!categoryListItem.length && !noData">
        <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="content">
        <navigator :url="'/pages/preview/preview?id=' + item._id" class="list-item" v-for="item in categoryListItem" :key="item._id">
           <image :src="item.smallPicurl" mode="aspectFill"></image>
        </navigator>
    </view>
    <view class="loadingLayout" v-if="categoryListItem.length || noData">
        <uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
    </view>
</template>
<script setup>
import { ref } from 'vue';
import { apiCategoryListItem, apiUserHistory } from "@/api/paper.js"
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { gotoHome } from '@/utils/common.js'
const categoryListItem = ref([])
const noData = ref(false)
let query_params = {
    pageNum: 1,
    pageSize: 12
}
onLoad((e) => { 
    let { id=null, name=null, type=null } = e;
    if(type) query_params.type = type
    if(id) query_params.classid = id
    // if(!id){
    //     return gotoHome()
    // }
    uni.setNavigationBarTitle({
        title: name
    })
    query_params.title = name
    getCategoryListItem()
})

onReachBottom(() => {
    if(noData.value) return
    query_params.pageNum += 1
    getCategoryListItem()
})

const getCategoryListItem = async () => {
    let res
    if(query_params.classid) res = await apiCategoryListItem(query_params)
    if(query_params.type) res = await apiUserHistory(query_params)
    categoryListItem.value = [...categoryListItem.value, ...res.data]
    if(res.data.length < query_params.pageSize){
        noData.value = true
    }
    uni.setStorageSync('storageCategory', categoryListItem.value)
}

// 分享给好友
onShareAppMessage((e) => {
    return {
        title: '壁纸大全' + query_params.title,
        path: "/pages/category-list/category-list?id=" + query_params.classid + "&name=" + query_params.title
    }
})

// 分享朋友圈
onShareTimeline(()=>{
    return {
        title: '壁纸大全' + query_params.title,
        query: "id=" + query_params.classid + "&name=" + query_params.title
    }
})

onUnload(() => {
    return uni.removeStorageSync('storageCategory')
})
</script>
<style lang="scss" scoped>
.content{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 5rpx;
    .list-item{
        height: 440rpx;
        image{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
</style>
