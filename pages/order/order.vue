<template>
	<view class="index">
		<view class="tabs">
			<view class="tabs-title">待付款</view>
			<view class="tabs-title">已付款</view>
			<view class="tabs-title">已取消</view>
			<view class="tabs-title">已完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshing: false,
				loadMoreText: "加载中...",
				lists: [],
				id: 0,
				fetchPageNum: 0
			}
		},
		onLoad(e) {
			this.id = e.id;
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.refreshing = true;
			this.getData();
		},
		onReachBottom() {
			console.log("上拉加载刷新");
			if (this.fetchPageNum > 4) {
				this.loadMoreText = "没有更多了"
				return;
			}
			this.getData();
		},
		methods: {

		}
	}
</script>

<style>
	.tabs {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		/* -webkit-box-ordinal-group: 4; */
	}
	.tabs .tabs-title {
		flex: 1;
		text-align: center;
		font-size: 20upx;
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
