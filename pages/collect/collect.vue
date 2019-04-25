<template>
	<view>
		<view class="collect-item" v-for="(item,index) in count" :key="index" @tap="gotoRoom">
			<image class="collect-icon" src="../../static/images/user/heart.png" mode=""></image>
			<image class="collect-img" src="../../static/images/room/20181214161550000808031.jpg" mode=""></image>
			<view class="collect-title">
				<h2>豪斯菲尔温馨浪漫双床房</h2>
				<p>￥208.0</p>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			count:10
		};
	},
	methods: {
		gotoRoom(){
			uni.navigateTo({
				url:"../roomDetails/roomDetails"
			})
		}
	}
};
</script>

<style lang="scss">
.collect-item {
	position: relative;
	margin: 27.17391upx;
	border-radius: 18.11594upx;
	overflow: hidden;
	box-shadow: 0 1px 2px #f1f1f1!important;
    border: 1px solid #f1f1f1!important;
	.collect-icon{
		width: 47.10144upx;
		height: 45.28985upx;
		position: absolute;
		z-index: 4;
		right: 36.23188upx;
		top: 36.23188upx;
	}
	.collect-img {
		width: 100%;
		height: 362.31884upx;
		border-top-left-radius: 18.11594upx;
		border-top-right-radius: 18.11594upx;
	}
	.collect-title {
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 0px 10px;
		h2 {
			flex: 1;
			font-size: 17px;
			font-weight: 500;
			margin: 11px 8px 11px 0;
		}
		p{
			color: red;
			font-size: 16px;
		};
		
	}
}
</style>
