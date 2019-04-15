<template>
	<view class="tabs">
		<view class="tabs-title" :class="num == 1 ? 'active' : ''" @click="checked(1)">待付款</view>
		<view class="tabs-title" :class="num == 2 ? 'active' : ''" @click="checked(2)">已付款</view>
		<view class="tabs-title" :class="num == 3 ? 'active' : ''" @click="checked(3)">已取消</view>
		<view class="tabs-title" :class="num == 4 ? 'active' : ''" @click="checked(4)">已完成</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: 1
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
