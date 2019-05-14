<template>
	<view class="updPage">
		<scroll-view scroll-y class="list">
			<view class="list-item" hover-class="color-hover" @tap="updUp('UNIT')">
				<image src="../../static/images/user/feedback.png" mode="" class="item-icon"></image>
				<span>修改发票抬头</span>
				<image src="../../static/images/index/right.png" mode="" class="item-icon"></image>
			</view>
			<view class="list-item" hover-class="color-hover" @tap="updUp('SPECIAL')">
				<image src="../../static/images/user/feedback.png" mode="" class="item-icon"></image>
				<span>修改公司信息</span>
				<image src="../../static/images/index/right.png" mode="" class="item-icon"></image>
			</view>
			<view class="list-item" hover-class="color-hover" @tap="updUp('ADDRESS')">
				<image src="../../static/images/user/feedback.png" mode="" class="item-icon"></image>
				<span>修改收件地址</span>
				<image src="../../static/images/index/right.png" mode="" class="item-icon"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		updUp(flag) {
			if (flag == 'UNIT') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'plainInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'PERSON') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'plainInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'SPECIAL') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'specialInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'ADDRESS') {
				uni.navigateTo({
					url: 'addAddress?obj=' + JSON.stringify(obj)
				});
			}
		}
	}
};
</script>

<style lang="scss">
.updPage {
	.list {
		.color-hover {
			background-color: #f7f9fb;
		}
		.list-item {
			display: flex;
			vertical-align: middle;
			align-items: center;
			padding: 36.23188upx 18.11594upx;
			border-bottom: 1px solid #f7f9fb;
			span {
				flex: 1;
				margin: 0 36.23188upx;
			}
			.item-icon {
				width: 36.23188upx;
				height: 36.23188upx;
			}
		}
	}
}
</style>
