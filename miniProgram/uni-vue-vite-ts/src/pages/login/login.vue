<template>
    <view class="container login_container">
        <!-- 登录页面顶部 -->
        <view class="login_content">
            <view class="login_logo"></view>
            <view class="login_main_type">
                <button class="login_main_type_item" @click="login">
                    <text>微信登陆</text>
                </button>
            </view>
        </view>
        <!-- 登录底部:带有协议 -->
        <view class="login_footer">
            <view class="login_protocol">
                <view :class="['login_check_icon', agree && 'checked']" @click="agree = !agree"></view>
                <view class="login_block">
                    我已阅读并同意
                    <navigator class="link">用户协议</navigator>
                    和
                    <navigator class="link">隐私声明</navigator>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import ajax from "@/api/index";
import { ref } from "vue";
// 控制复选框的勾选状态
const agree = ref(false);


//微信登录按钮的回调
const login = () => {
    // 微信授权登录先判断是都协议同意了！！
    if (!agree.value) {
        uni.showToast({
            title: "请务必勾选协议", //标题
            icon: "error", //图标
        });
        return;
    }

    //用户同意协议:获取微信登录临时凭证
    uni.login({
        provider: 'weixin', //使用微信登录
        success(res: any) { // 获取code
            //获取token
            getToken(res.code);
        },
    })
}

//获取用户身份凭证token
const getToken = async (code: string) => {
    const result = await ajax.reqToken(code);
    if (result.code == 200) {
        uni.setStorageSync("TOKEN", result.data.token);
        //返回上一页
        uni.navigateBack();
    }
};

</script>

<style lang="less" scoped>
.login_container {
    background: #00cc99;
    border-top: 1rpx solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .login_content {
        padding: 0 36px;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 48px;

        .login_logo {
            width: 72px;
            height: 72px;
        }

        .login_main_type {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 48px;

            .login_main_type_item {
                height: 56px;
                margin-bottom: 24px;
                border-radius: 30px;
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80%;
                text-align: center;

                image {
                    width: 26px;
                    height: 26px;
                }

                text {
                    margin-left: 8px;
                    color: #333;
                    font-size: 18px;
                }
            }
        }

        .login_more {
            color: #fff;
            font-size: 14px;
        }
    }

    .login_footer {
        .login_protocol {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;

            .login_block {
                display: flex;
                color: #333;
            }

            .login_check_icon {
                width: 24px;
                height: 24px;
                background-repeat: no-repeat;
                background-size: 24px 48px;
                background-image: url("https://8.idqqimg.com/edu/mobilev2/m-core/1f3256dafe9eb438879b434bd4105394.png");
                background-position: 0 0;

                &.checked {
                    background-position: 0 -24px;
                }
            }

            .link {
                color: #fff;
            }
        }
    }
}
</style>