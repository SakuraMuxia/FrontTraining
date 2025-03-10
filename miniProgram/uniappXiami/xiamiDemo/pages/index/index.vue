<template>
    <view class="title">近期热搜</view>

    <view class="out">
        <view class="list">
            <view class="row" v-for="(item, index) in lists" :key="item.id">
                <view class="text">{{ index + 1 }}. {{ item.title }}</view>
                <view class="close" @click="onClose(index)">
                    <icon type="clear" size="26" />
                </view>
            </view>
        </view>
        <view class="count">共{{ lists.length }}条梗</view>
        <view class="comment">
            <input
                type="text"
                placeholder="请输入热梗..."
                v-model="inputValue"
                @confirm="onSubmit" />
            <button
                size="mini"
                type="primary"
                :disabled="!inputValue.length"
                @click="onSubmit">
                发布
            </button>
        </view>
    </view>
</template>

<script setup>
import { ref } from "vue";
const lists = ref([
    { id: 111, title: "YuukiSakuna" },
    { id: 222, title: "紫咲诗音" },
    { id: 333, title: "遥遥领先" },
    { id: 444, title: "最大值我爱你" },
]);

const inputValue = ref("");

const onClose = function (index) {
    lists.value.splice(index, 1);
};

const onSubmit = function () {
	// 数组中添加
    lists.value.push({ 
		id: Date.now(), 
		title: inputValue.value ,
	});
	// 清空输入框中的内容
    inputValue.value = "";
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 26px;
    text-align: center;
    color: #3c3c3c;
    padding: 30px 0 15px;
}
.out {
    width: 90vw;
    margin: 15px auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    .list {
        .row {
            padding: 10px 0;
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            color: #333;
            .text {
                padding-right: 5px;
                box-sizing: border-box;
            }
        }
    }
    .count {
        padding: 10px 0;
        font-size: 15px;
        color: #888;
        text-align: center;
    }
    .comment {
        display: flex;
        margin-top: 10px;
        input {
            flex: 4;
            background: #f4f4f4;
            margin-right: 5px;
            height: 100%;
            height: 32px;
            border-radius: 4px;
            padding: 0 10px;
            color: #333;
        }
        button {
            flex: 1;
        }
    }
}
</style>
