<template>
    <view class="container pay-wrap">
        <view class="item">
            <view class="title">订单信息</view>
            <view class="msg">课程名称：<text>{{ "vue3" }}</text></view>
            <view class="msg">授课老师：<text>{{ "志勇" }}</text></view>
            <view class="msg">订单编号：<text>{{ 123 }}</text></view>
        </view>
        <view class="item">
            <view class="title">购买账户</view>
            <view class="msg">账户名：<text>{{ "志勇在线" }}</text></view>
            <view class="msg">联系电话：<text>{{ 13888888888 }}</text></view>
        </view>
        <view class="item">
            <view class="title">结算</view>
            <view class="msg msg_price">订单原价：<text class="price">¥{{ 298 }}</text></view>
            <view class="msg msg_price">已优惠：<text class="price">¥0</text></view>
            <view class="msg msg_price">需支付金额：<text class="price">¥{{ 198 }}</text></view>
            <view class="check">
                <checkbox-group>
                    <checkbox :checked="true" style="transform: scale(0.7)" /> 同意
                </checkbox-group>
                <navigator class="'link" url=""> 《谷粒微课购买协议》 </navigator>
            </view>
        </view>
        <view class="pay">
            <view class="price">
                实际支付
                <text>¥{{ 123 }}</text>
            </view>
            <view class="pay_btn">去付款</view>
        </view>
    </view>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>
.container {
    .pay-wrap {
        min-height: 100vh;
    }

    background: rgba(130, 145, 158, 0.1);

    .item {
        background: #fff;
        margin-bottom: 8px;
        padding: 12px 16px;

        .title {
            color: #7b8998;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
        }

        .msg {
            font-size: 12px;
            color: #7b8998;
            height: 20px;
            line-height: 20px;

            &.msg_price {
                display: flex;
                width: 100%;
                justify-content: space-between;
            }

            text {
                color: #072943;

                &.price {
                    color: #ff0042;
                }
            }
        }
    }

    .check {
        color: #7b8998;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding-top: 16px;

        .link {
            color: rgb(33, 150, 243);
        }
    }

    .pay {
        background: linear-gradient(180deg,
                hsla(0, 0%, 86.7%, 0) 0,
                hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
                hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
                #fff 0.64286rem,
                #fff);
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .price {
            font-size: 12px;
            color: #7b8998;

            text {
                color: #ff0042;
                font-size: 18px;
            }
        }

        .pay_btn {
            width: 35%;
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-size: 18px;
            background: #ff0042;
            border-radius: 40px;
            text-align: center;
        }
    }
}
</style>