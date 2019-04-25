<template>
	<view class="index">
		<tab @selectFunc="checked"></tab>
		<view class="order-list">
			<view class="list-item" @click="orderDetails()" v-for="(item, index) of count" :key="index">
				<view class="text-item">
					<view class="text-left">
						<text class="roomname">双床房</text>
						<text class="roomcount">预定1间</text>
					</view>
					<view class="text-right"><text>已入住</text></view>
				</view>
				<view class="item-img">
					<image src="../../static/images/room/20181214172004933808032.jpg" mode="aspectFill" class="img"></image>
					<view class="msg">
						<view class="msg-time">
							<view class="in-time">
								<text class="cl-y">入住</text>
								<text class="cl-w">02月28日</text>
							</view>
							<view class="msg-img"><image src="../../static/images/order/arrow.png" mode=""></image></view>
							<view class="out-time">
								<text class="cl-y">离开</text>
								<text class="cl-w">02月28日</text>
							</view>
						</view>
						<view class="all-time">
							<text class="cl-y">共住</text>
							<text class="cl-w">40晚</text>
						</view>
					</view>
				</view>
				<view class="item-price">
					<text>
						合计:
						<text>￥228</text>
					</text>
				</view>
			</view>
		</view>
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
			fetchPageNum: 0,
			count:10
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
					console.log('出错了');
					break;
			}
		},
		orderDetails:function(){
			uni.navigateTo({
				url:'../../pages/order/orderDetails'
			})
		}
	}
};
</script>

<style>
.order-list {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #f5f9fc;
	font-weight: 500;
	position: relative;
	top: 61.5942upx;
	font-family: -apple-system, 'Helvetica Neue', Roboto, sans-serif;
}
.order-list .list-item {
	padding: 20upx 25upx;
	background-color: white;
	margin-top: 25upx;
}
.order-list .list-item .text-item {
	display: flex;
	margin-bottom: 20upx;
}
.order-list .list-item .text-item .text-left {
	color: #888;
	flex: 0.8;
}
.order-list .list-item .text-item .text-right {
	color: #000;
	text-align: right;
	flex: 0.2;
	padding-top: 16upx;
}
.order-list .list-item .text-item .text-right text {
	font-size: 33upx;
}
.order-list .list-item .text-item .text-left .roomname {
	font-size: 30.7971upx;
	display: block;
}
.order-list .list-item .text-item .text-left .roomcount {
	font-size: 25.36231upx;
}
.order-list .list-item .item-price {
	text-align: right;
}
.order-list .list-item .item-price > text {
	font-size: 30.7971upx;
	color: #888;
}
.order-list .list-item .item-price > text text {
	font-size: 30.7971upx;
	color: #f72845;
	margin-left: 40upx;
}
.order-list .list-item .item-img {
	border-radius: 15upx;
	margin-bottom: 25upx;
	height: 326.08695upx;
	overflow: hidden;
}
.order-list .list-item .item-img .img {
	width: 100%;
	height: 100%;
	display: block;
}
.order-list .list-item .item-img .msg {
	height: 100upx;
	position: relative;
	top: -100upx;
	display: flex;
	background-color: rgba(0, 0, 0, 0.6);
}
.order-list .list-item .item-img .msg text {
	display: block;
}

.order-list .list-item .item-img .msg .msg-time {
	flex: 0.8;
	display: flex;
	padding: 0 80upx;
	text-align: center;
}
.order-list .list-item .item-img .msg .msg-time image {
	width: 40upx;
	height: 40upx;
	margin-top: 25upx;
}
.order-list .list-item .item-img .msg .msg-time .in-time,
.msg-time,
.out-time {
	display: box;
	box-pack: center;
	box-orient: vertical;
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-orient: vertical;
	flex: 1;
}
.order-list .list-item .item-img text {
	font-size: 27.17391upx;
}
.order-list .list-item .item-img .cl-y {
	color: #ebe2bc;
}
.order-list .list-item .item-img .cl-w {
	color: #fff;
}
.order-list .list-item .item-img .msg .all-time {
	flex: 0.2;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.3);
	display: box;
	box-pack: center;
	box-orient: vertical;
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-orient: vertical;
}
</style>
