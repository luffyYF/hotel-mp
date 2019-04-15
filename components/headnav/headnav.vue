<template>
	<view class="nav">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="headnav" :class="flag ? 'white' : 'black'" :hidden="hd">
			<image :src="flag ? '../../static/images/back-black.png' : '../../static/images/back-white.png'" mode="" @click="goback()"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag: true,
			hd:false
		};
	},
	methods: {
		changeColor: function(flag) {
			this.flag = flag;
		},
		hiddenNav:function(hd){
			this.hd=hd;
		},
		goback: function() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style>
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.top_view {
	height: var(--status-bar-height);
	width: 100%;
	position: fixed;
	top: 0;
}
.nav .headnav {
	width: 100%;
	height: 68.84057upx;
	padding: 7.24637upx;
	position: fixed;
	z-index: 999999;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	top: var(--status-bar-height);
}
.nav .headnav > image {
	width: 39.85507upx;
	height: 39.85507upx;
}
.white {
	background-color: transparent;
}
.white > image {
	src: url(../../static/images/back-white.png);
}
.black {
	background-color: rgba(0, 0, 0, 0.6);
}
.black > image {
	src: url(../../static/images/back-black.png);
}
</style>
