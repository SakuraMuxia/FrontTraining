<template>
    <view class="container comment">
        <!-- 学员的更多的评价 -->
        <view class="comment_wrapper">
            <view class="comment_list">
                <!-- 每一个结构代表的是一个学员评价 -->
                <view class="comment_item" v-for="(item, index) in commentsList" :key="item.id">
                    <view class="logo">
                        <image :src="item.avatar" />
                    </view>
                    <view class="content_wrap">
                        <view class="name">{{ item.nickname }}</view>
                        <veiw class="date">
                            {{ item.gmtCreate }}
                            <uni-rate :touchable="false" :value="3.5" size="12" />
                        </veiw>
                        <view class="content">{{ item.content }}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 新增评论 -->
        <view class="comment_bar">
            <input class="input_box" placeholder="请点击输入" cursor-spacing="10" v-model="content" />
            <uni-icons class="input_icon" type="paperplane-filled" size="20" @click="addComments" />
        </view>
        <!-- 没有更多 -->
        <view v-if="status == 'nomore'" class="more">----没有更多----</view>
    </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import ajax from "@/api/index";
//当前默认页码
const page = ref(1);
//每一页展示学员评价个数
const limit = ref(10);
const teacherId = ref("")
const courseId = ref("")
//收集学员评价的内容
const commentsList = ref([])
//相应数据判断是否有发下一次请求,触底重新发送请求
const status = ref("");
//收集学员评价的内容
const content = ref("");

onLoad((options) => {
    //课程的ID
    courseId.value = options.courseId;
    //存储老师的ID
    teacherId.value = options.teacherId;
    // 获取全部评价
    getCommentsById()
})

//获取学员的评价
const getCommentsById = async () => {
    const result = await ajax.reqComment(page.value, limit.value, courseId.value);
    if (result.data.items.length < 10) {
        status.value = "nomore";
    } else {
        status.value = "more";
    }
    //存储学员评价
    commentsList.value.push(...result.data.items);
};

// 新增评价
const addComments = async () => {
    // 先判断是否是空内容
    if (content.value.trim() == "") {
        uni.showToast({ title: "评论内容不能为空", icon: "error" });
        return;
    }
    // 发送 添加评价请求
    const result = await ajax.reqAddComment({
        courseId: courseId.value,
        teacherId: teacherId.value,
        content: content.value,
    })
    // 再次获取更新后全部评价
    if (result.code == 200) {
        // 清空评价列表
        commentsList.value = [];
        page.value = 1;
        // 清空评论框内容
        content.value = '';
        getCommentsById();
    }
}
onReachBottom(() => {
    //如果状态为更多在发请求
    if (status.value == "more") {
        page.value++;
        getCommentsById()
    }
})

</script>

<style lang="less" scoped>
.comment_list {
    .comment_item {
        display: flex;
        padding: 15px 0;
        border-bottom: 0.07143rem solid #ececec;

        .logo {
            border-radius: 50%;
            width: 32px;
            height: 32px;
            margin-right: 8px;

            image {
                border-radius: 50%;
                height: 100%;
                width: 100%;
            }
        }

        .content_wrap {
            font-size: 12px;
            color: #000;
            flex: 1;

            .date {
                color: #a1a5b2;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .content {
                margin-top: 8px;
            }
        }
    }
}

.comment {
    background: white;
    padding: 16px 16px 60px 16px;

    .comment_bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg,
                hsla(0, 0%, 86.7%, 0) 0,
                hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
                hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
                #fff 0.64286rem,
                #fff);

        .input_box {
            width: 80%;
            height: 30px;
            line-height: 30px;
            background-color: #f2f3f7;
            border-radius: 20px;
            // text-indent: 10px;
            padding-left: 10px;
            font-size: 16px;
        }

        .input_icon {
            margin-left: 8px;
        }
    }
}

.more {
    text-align: center;
    color: yellowgreen;
}
</style>