<template>
	<view class="index">
		<tab @selectFunc="checked"></tab>
		<orderlist></orderlist>
	</view>
</template>

<script>
import tab from '../../components/tab/tab.vue';
import orderlist from '../../components/order/list-item.vue';
import np from '../../components/order/no-order.vue';
export default {
	components: {
		tab,
		orderlist,
		np
	},
	data() {
		return {
			refreshing: false,
			loadMoreText: '加载中...',
			flag: true,
			lists: [],
			id: 0,
			fetchPageNum: 0
		};
	},
	onLoad(e) {
		this.id = e.id;
	},
	onPullDownRefresh() {
		console.log('下拉刷新');
		this.refreshing = true;
		this.getData();
	},
	onReachBottom() {
		console.log('上拉加载刷新');
		if (this.fetchPageNum > 4) {
			this.loadMoreText = '没有更多了';
			return;
		}
		this.getData();
	},
	methods: {
		checked: function(e) {
			switch (e) {
				case 1:
					this.flag = true;
					console.log(this.flag);
					break;
				case 2:
					this.flag = false;
					console.log(this.flag);
					break;
				case 3:
					this.flag = false;
					console.log(this.flag);
					break;
				case 4:
					this.flag = true;
					console.log(this.flag);
					break;
				default:
				console.log("出错了");
					break;
			}
		}
	}
};
</script>

<style></style>
