<template>
    <view class="courser_detail_container">
        <!-- 课程内容 -->
        <view class="course">
            <view class="banner">
                <image :src="course.course?.cover" />
            </view>

            <view class="info">
                <view class="price">
                    <h3>
                        <text>¥ {{ course.course?.price }}</text>
                    </h3>
                    <view class="buy_count">已有 {{ course.course?.buyCount }} 人购买</view>
                </view>
                <h3 class="name">
                    {{ course.course?.title }}
                </h3>
                <view class="tag_list">
                    <view class="tag_item">{{ course.course?.subjectLevelTwo }}</view>
                </view>
            </view>

            <!-- 课程卡片 -->
            <view class="course_card">
                <!-- 讲师介绍 -->
                <view class="intro card">
                    <view class="title"> 讲师介绍 </view>
                    <navigator url="讲师详情" class="teacher_info">
                        <view class="avatar">
                            <image :src="course.course?.avatar" />
                        </view>
                        <view class="teacher_desc">
                            <view class="teacher_name">高级讲师-{{ course.course?.teacherName }}</view>
                            <view class="teacher_intro">{{ course.course?.intro }}</view>
                        </view>
                    </navigator>
                    <view class="title"> 课程详情 </view>
                    <view class="course_detail" v-html="course.course?.description"></view>
                </view>

                <!-- 课程目录 -->
                <view class="catalogue card">
                    <view class="title"> 课程目录 </view>
                    <view class="catalogue_list">
                        <!-- uni-uid的组件展示课程章节 -->
                        <uni-collapse ref="collapse" accordion>
                            <uni-collapse-item :title="item.title" v-for="(item, index) in course.chapterList"
                                :key="item.id">
                                <view class="task_list" v-for="(info, index) in item.children" :key="info.id">
                                    <view class="task_items">
                                        <image class="task_type"
                                            src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png" />
                                        <view class="task_title">{{ info.title }}</view>
                                        <image v-show="!course.isBuy" class="task_icon"
                                            src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/064fdd1eb99fcb8bef80085f2b548e4b.png" />
                                    </view>
                                </view>
                            </uni-collapse-item>
                        </uni-collapse>
                    </view>
                </view>

                <!-- 学员评价 -->
                <view class="comment card">
                    <view class="title">
                        <view class="title_left"> 学员评价（{{ total }}）</view>
                        <navigator
                            :url="`/pages/course/comments/comments?courseId=${courseId}&teacherId=${course.course?.teacherId}`"
                            class="title_right">
                            查看全部<uni-icons type="right" color="#666c80" size="12"></uni-icons>
                        </navigator>
                    </view>
                    <!-- 评价列表 -->
                    <view class="comment_wrapper">
                        <view class="comment_list">
                            <!-- 每一个结构代表的是一个学员评价 -->
                            <view class="comment_item" v-for="(item, index) in recommentArr" :key="item.id">
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
                        <navigator
                            :url="`/pages/course/comments/index?courseId=${courseId}&teacherId=${course.course?.teacherId}`"
                            open-type="navigate" hover-class="navigator-hover">
                            <uni-load-more status="more" :content-text="{ contentdown: '点击查看更多评论内容' }" />
                        </navigator>
                    </view>
                </view>
            </view>
        </view>
        <!-- 回到顶部 -->
        <v-top v-show="isShowBack"></v-top>

        <!-- 底部按钮 -->
        <view class="bottom_tabbar">
            <view class="bottom_wrap">
                <view class="bottom_button">
                    <!-- 收藏 -->
                    <view class="favo_button" @click="changeCollect">
                        <view :class="['bg', course.isCollect && 'active']"></view>
                        {{ course.isCollect ? "已收藏" : "未收藏" }}
                    </view>
                </view>
                <view class="bottom_main">
                    <view class="buy_button" @click="goBuyOrLearn">
                        {{ course.isBuy ? "去学习" : "去购买" }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { onLoad, onReachBottom, onPageScroll } from "@dcloudio/uni-app"
import ajax from '@/api/index.ts'
//存储课程的ID
const courseId = ref("")

//存储课程详情的数据
const course: any = ref({});

//控制课程详情页v-back的显示与隐藏
const isShowBack = ref(false);
//存储学员的评价总条数
const total = ref(0);
//学员评价的信息
const recommentArr = ref([]);

// 获取课程详情函数
const getCourseDetail = async () => {
    const result = await ajax.reqCourseDetail(courseId.value);
    if (result.code == 200) {
        course.value = result.data;
    }
    console.log(course.value)
}
//获取学员的评价
const getComment = async () => {
    const result = await ajax.reqComment(1, 10, courseId.value);
    if (result.code == 200) {
        total.value = result.data.total;
        recommentArr.value = result.data.items;
    }
}
// 收藏回调函数
const changeCollect = async () => {
    // 如果已经收藏
    if (course.value.isCollect) {
        await ajax.reqDeleteSave(courseId.value)
        //提示
        uni.showToast({ title: "取消收藏" });
    } else {
        //添加收藏
        await ajax.reqSave(courseId.value);
        uni.showToast({ title: "收藏成功" });
    }
    //第一种做法:再一次获取课程的数据
    //第二种:把课程的收集的字段取反
    course.value.isCollect = !course.value.isCollect;
}
// 学习和支付回调
const goBuyOrLearn = () => {
    // 如果已经购买
    if (course.value.isBuy) {
        uni.navigateTo({
            url: `/pages/course/learning/learning?videoSourceId=${course.value.chapterList[0].children[0].videoSourceId}&courseId=${courseId.value}`,
        });
    }
}
onLoad((options) => {
    //存储用户点击的课程的ID
    courseId.value = options.courseId
    //获取课程详情
    getCourseDetail()
    //获取学员对于某一个课程的评价
    getComment()
})
//监听课程详情页的滚动
onPageScroll((event) => {
    if (event.scrollTop >= 200) {
        isShowBack.value = true;
    } else {
        isShowBack.value = false;
    }
})
</script>

<style lang="less" scoped>
.course {
    background: #f2f3f8;
    padding-bottom: 56px;

    .banner {
        height: 210px;
        width: 100%;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .info {
        border-radius: 0 0 12px 12px;
        padding: 16px;
        margin-bottom: 12px;

        .price {
            display: flex;
            justify-content: space-between;

            h3 {
                color: #ff7b37;
                font-size: 20px;

                text {
                    font-size: 12px;
                }
            }

            .buy_count {
                font-size: 12px;
                color: #666c80;
            }
        }

        .name {
            font-size: 18px;
            margin: 8px;
        }

        .tag_list {
            display: flex;

            .tag_item {
                border: 1px solid #666c80;
                color: #666c80;
                display: inline-block;
                padding: 0px 10px;
                font-size: 12px;
                height: 18px;
                border-radius: 16px;
                line-height: 18px;
                margin-right: 8px;
            }
        }
    }

    .tab_wrapper {
        border-radius: 0 0 12px 12px;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        color: #3c464f;
        padding: 16px 0;

        .title_left {
            &::before {
                content: "";
                width: 4px;
                height: 12px;
                border-radius: 10px;
                margin-right: 6px;
                background-color: #2979ff;
            }
        }

        .title_right {
            color: #666c80;
            font-size: 12px;
        }
    }

    .course_card {
        display: flex;
        flex-direction: column;
    }

    .card {
        padding: 0 16px;
        background: #fff;
        margin-bottom: 12px;
        flex: 1;
        // min-height: 1000px;
        // height: 100vh;
    }

    .intro {
        .teacher_info {
            display: flex;
            align-items: center;
            border-radius: 12px;
            background: #f5f6fa;
            padding: 12px;

            .avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;

                image {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .teacher_desc {
                flex: 1;
                overflow: hidden;
                margin-left: 10px;

                .teacher_name {
                    font-size: 12px;
                    color: #3e414d;
                }

                .teacher_intro {
                    word-break: break-all;
                    font-size: 12px;
                    color: #666c80;
                    text-align: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-wrap: normal;
                }
            }
        }

        .course_detail {
            padding-bottom: 16px;
        }
    }

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

    .catalogue {
        .catalogue_list {
            .task_list {
                .task_items {
                    display: flex;
                    padding: 12px;

                    .task_type {
                        width: 16px;
                        height: 16px;
                    }

                    .task_title {
                        flex: 1;
                        font-size: 12px;
                        color: #3e414d;
                        margin-left: 10px;

                        &::after {
                            content: "";
                            position: absolute;
                            bottom: -12px;
                            left: 0;
                            width: 100%;
                            height: 0.07143rem;
                            background-color: #c9d0d6;
                            transform: scaleY(0.5);
                            opacity: 0.5;
                        }
                    }

                    .task_icon {
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
    }
}

.bottom_tabbar {
    // background: #fff;
    background: linear-gradient(180deg,
            hsla(0, 0%, 86.7%, 0) 0,
            hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
            hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
            #fff 0.64286rem,
            #fff);
    padding: 8px 16px 0 16px;
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;

    .bottom_wrap {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .bottom_button {
        flex: 1;
        padding: 6px 0;

        .favo_button {
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: 12px;
            color: #8797a1;

            .bg {
                width: 24px;
                height: 24px;
                background-image: url("https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/0cfab2184a7ac26a164fdc334d40d382.png");
                background-size: 100% 100%;

                &.active {
                    background-image: url("https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/88b416217e2eca5e9e9f1f3fac1e7f24.png");
                }
            }
        }
    }

    .bottom_main {
        flex: 1;
        padding: 6px 0;

        .buy_button {
            width: 90%;
            height: 2.85714rem;
            line-height: 2.85714rem;
            text-align: center;
            color: #fff;
            border: none;
            font-size: 1.14286rem;
            border-radius: 7.14286rem;
            background-color: #ff7a38;
        }
    }
}
</style>