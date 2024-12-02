<template>
    <view class="container">
        <!-- 学习的视频 -->
        <view>
            <video class="video" :src="playUrl"
                poster="https://www.gulixueyuan.com/files/course/2022/11-15/10000666c9a9690562.jpg" object-fit="fill"
                :controls="true" autoplay page-gesture enable-play-gesture>
            </video>
        </view>
        <!-- 学习某一个课程内容 -->
        <view class="catalogue">
            <view class="title"> 课程目录 </view>
            <view class="catalogue_list">
                <uni-collapse ref="collapse">
                    <uni-collapse-item :title="item.title" v-for="item in chapterList" :key="item.id">
                        <view class="task_list">
                            <view class="task_items" v-for="info in item.children" :key="info.id">
                                <image class="task_type"
                                    src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png" />
                                <view class="task_title">{{ info.title }}</view>
                            </view>
                        </view>
                    </uni-collapse-item>
                </uni-collapse>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import ajax from "@/api/index";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const videoSourceId = ref("");
const chapterList = ref([]);
//存储播放视频地址
const playUrl = ref("");
//存储课程的id
const courseId = ref("");

// 获取视频
const getVideo = async () => {
    // 切记:微信小程序、uniapp，播放视频不能用本地资源
    const reuslt = await ajax.reqPlayUrl(videoSourceId.value);
    if (reuslt.code == 200) {
        playUrl.value = reuslt.data.playURL;
    }
}

// 获取课程详情数据
const getCourse = async () => {
    const result = await ajax.reqCourseDetail(courseId.value);
    if (result.code == 200) {
        chapterList.value = result.data.chapterList;
    }
}

onLoad((options) => {
    videoSourceId.value = options.videoSourceId;
    courseId.value = options.courseId;
    //获取第一个视播放地址
    getVideo()
    //获取课程详情
    getCourse()
})

</script>

<style lang="scss" scoped>
.video {
    width: 100%;
}

.catalogue {
    padding: 0 16px;
    background: #fff;
    margin-bottom: 12px;

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
</style>