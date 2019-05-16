<template>
	<view class="tabs">
		<view class="tabs-title" :class="num == 'OBLIGATION' ? 'active' : ''" @click="checked('OBLIGATION')">待付款</view>
		<view class="tabs-title" :class="num == 'RESERVE' ? 'active' : ''" @click="checked('RESERVE')">已付款</view>
		<view class="tabs-title" :class="num == 'CANCEL' ? 'active' : ''" @click="checked('CANCEL')">已取消</view>
		<view class="tabs-title" :class="num == 'FINISH' ? 'active' : ''" @click="checked('FINISH')">已完成</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: "OBLIGATION"
		};
	},
	methods: {
		checked: function(e) {
			this.num = e;
			this.$emit('selectFunc', e);
		}
	}
};
</script>

<style>
.tabs {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	position: fixed;
	width: 100%;
	z-index: 999;
	border-bottom:1px solid #f7f9fb;

	/* -webkit-box-ordinal-group: 4; */
}
.tabs .tabs-title {
	flex: 1;
	text-align: center;
	font-size: 25upx;
	border: none;
	color: #333;
	height: 44px;
	line-height: 44px;
}

.tabs .tabs-title.active {
	background: 0 0;
	color: #cda754;
	border-bottom: 2px solid #cda754;
}
</style>
