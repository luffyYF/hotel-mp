<template>
	<view class="index">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="标题"></uni-nav-bar>
		<tab @selectFunc="checked"></tab>
		<view v-if="isShow" class="order-list">
			<view class="list-item" @click="orderDetails(item)" v-for="(item, index) of lists" :key="index">
				<view class="text-item">
					<view class="text-left">
						<text class="roomname">{{ item.roomTypeName }}</text>
						<text class="roomcount">预定{{ item.rentCount }}间</text>
					</view>
					<view class="text-right">
						<text>
							{{
								item.orderStatus == 0
									? '待付款'
									: item.orderStatus == 1
									? '待接单'
									: item.orderStatus == 2
									? '已接单'
									: item.orderStatus == 3
									? '已入住'
									: item.orderStatus == 4
									? '取消中'
									: item.orderStatus == 5
									? '已取消'
									: item.orderStatus == 6
									? '已完成'
									: '错误'
							}}
						</text>
					</view>
				</view>
				<view class="item-img">
					<image :src="IMGURL + item.coverImage" mode="aspectFill" class="img"></image>
					<view class="msg">
						<view class="msg-time">
							<view class="in-time">
								<text class="cl-y">入住</text>
								<text class="cl-w">{{ item.beginDate }}</text>
							</view>
							<view class="msg-img"><image src="../../static/images/order/arrow.png" mode=""></image></view>
							<view class="out-time">
								<text class="cl-y">离开</text>
								<text class="cl-w">{{ item.endDate }}</text>
							</view>
						</view>
						<view class="all-time">
							<text class="cl-y">共住</text>
							<text class="cl-w">{{ item.nights }}晚</text>
						</view>
					</view>
				</view>
				<view class="item-price">
					<text>
						合计:
						<text>￥{{ item.totalPrice }}</text>
					</text>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" style="position: relative;" v-if="showLoadMore">{{ loadMoreText }}</view>
		<np v-if="!isShow"></np>
	</view>
</template>

<script>
import tab from '../../components/tab/tab.vue';
import np from '../../components/order/no-order.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'

import api from '../../utils/api.js';
import allocation from '../../utils/config.js';
import user from '@/services/user.js';
var app = getApp();
export default {
	components: {
		tab,
		np,
		uniNavBar,
		uniIcon
	},
	data() {
		return {
			lists: [],
			fetchPageNum: 0,
			IMGURL: '',
			orderStatus: 'OBLIGATION',
			statusTitle: '待付款',
			isShow: true,
			loadMoreText: '加载中...',
			showLoadMore: false,
			max: 1,
			userInfo: {}
		};
	},
	onShow() {
		let that = this;

		user.isUserinfo()
			.then(res => {
				user.getUserInfo().then(res => {
					this.showList(res, 1, 10);
				});
			})
			.catch(res => {
				uni.navigateTo({
					url: '../login/login'
				});
			});
	},
	onReachBottom() {
		setTimeout(() => {
			++this.max;
			this.showList(this.userInfo, this.max, 10);
		}, 300);
	},
	methods: {
		checked: function(e) {
			this.orderStatus = e;
			switch (e) {
				case 'OBLIGATION':
					this.statusTitle = '待付款';
					this.showList(this.userInfo, 1, 10);
					break;
				case 'RESERVE':
					this.statusTitle = '已付款';
					this.showList(this.userInfo, 1, 10);
					break;
				case 'CANCEL':
					this.statusTitle = '已取消';
					this.showList(this.userInfo, 1, 10);
					break;
				case 'FINISH':
					this.statusTitle = '已完成';
					this.showList(this.userInfo, 1, 10);
					break;
				default:
			}
		},
		orderDetails(item) {
			api.getOrder({
				orderPk: item.orderPk,
				userPk: this.userInfo.memPk
			}).then(res => {
				if (res.code == 1) {
					/* 	var obj = JSON.stringify(res.data); */
					
					uni.navigateTo({
						url: '../../pages/order/orderDetails?orderDetails=' + JSON.stringify(res.data)
					});
				}
			});
		},
		getDays(strDateStart, strDateEnd) {
			var strSeparator = '-'; //日期分隔符
			var oDate1;
			var oDate2;
			var iDays;
			oDate1 = strDateStart.split(strSeparator);
			oDate2 = strDateEnd.split(strSeparator);
			var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
			var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
			iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
			return iDays;
		},
		showList(userInfo, pageNum, pageSize) {
			let that = this;
			this.userInfo = userInfo;
			api.listOrder({
				orderStatus: this.orderStatus,
				pageNum: pageNum,
				pageSize: pageSize,
				userPk: userInfo.memPk
			}).then(res => {
				if (res.code == 1) {
					if (pageNum <= 1) {
						if (res.data.length < pageSize) {
							this.showLoadMore = false;
						} else {
							this.showLoadMore = true;
						}
						if (res.data.length <= 0) {
							this.isShow = false;
						} else {
							this.isShow = true;
						}
						this.lists = res.data;

						for (var i = 0; i < this.lists.length; i++) {
							var strDateStart = this.lists[i].beginDate;
							var strDateEnd = this.lists[i].endDate;
							this.lists[i].nights = this.getDays(strDateStart, strDateEnd);
						}

						//0.待付款 1.待接单 2.已接单 3.已入住 4.取消中 5.已取消 6.已完成
						this.IMGURL = api.config.IMGURL;
					} else {
						this.showLoadMore = true;
						this.isShow = true;
						this.lists = this.lists.concat(res.data);
						for (var i = 0; i < this.lists.length; i++) {
							var strDateStart = this.lists[i].beginDate;
							var strDateEnd = this.lists[i].endDate;
							this.lists[i].nights = this.getDays(strDateStart, strDateEnd);
						}
						//0.待付款 1.待接单 2.已接单 3.已入住 4.取消中 5.已取消 6.已完成
						this.IMGURL = api.config.IMGURL;

						if (res.data.length <= 0) {
							this.loadMoreText = '没有更多数据了!';
						}
					}
				}
			});
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
	flex: 0.3;
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
