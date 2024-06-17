<template>
    <view class="classLayout pageBg">
        <custom-nav-bar title="分类"></custom-nav-bar>
        <view class="category">
            <theme-item v-for="item in categoryList" :id="item._id" :item="item"></theme-item>
        </view>
    </view>
</template>
<script setup>
import { ref } from 'vue';
import { apiCategoryList } from '@/api/paper.js'
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"

const categoryList = ref([])
const getCategoryList = async () => {
    let res = await apiCategoryList({ pageSize: 15 })
    categoryList.value = res.data
}
getCategoryList()

// 分享给好友
onShareAppMessage((e) => {
    return {
        title: '壁纸分类',
        path: "/pages/category/category"
    }
})

// 分享朋友圈
onShareTimeline(()=>{
    return {
        title: '壁纸大全',
        imageUrl: "/static/logo.png"
    }
})
</script>
<style lang="scss" scoped>
.category{
    padding: 30rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15rpx;
}
</style>
