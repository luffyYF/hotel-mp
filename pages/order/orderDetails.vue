<template>
	<view class="orderPage">
		<view class="orderDetails">
			<view class="markedwords">
				<text>已入住</text>
				<text>已办理入住成功，请尽情享受</text>
			</view>
			<view class="warmPrompt">
				<view class="warm-title"><text>温馨提示</text></view>
				<view class="warm-content">
					<view class="warm-left"><text>入住说明</text></view>
					<view class="warm-right">
						<text>请携带所有入住人的有效身份证，报预定人姓名，于2月28日14:00后办理入住，于4月09日前退房，如需提前入住或延迟退房请联系商家</text>
					</view>
				</view>
			</view>
			<view class="checkin">
				<view class="checkindate">
					<view>
						<p>入住</p>
						<p>2月28日</p>
					</view>
					<view class="cy"><text>41晚</text></view>
					<view>
						<p>离开</p>
						<p>4月10日</p>
					</view>
				</view>
				<view class="checkinCard">
					<view class="checkinName" @click="goRoom()">
						<h3>豪斯菲尔公寓(华发世纪城店)</h3>
						<text class="cc">双床房 (1间)</text>
						<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>

					<image class="houseImg" src="../../static/images/order/20180607170339698808043.jpg" mode=""></image>
					<view class="checkinAddress">
						<view class="Address">
							<text>地址:</text>
							<text>拱北昌盛路376号华发世纪城三期157栋1单元</text>
							<image class="icons" src="../../static/images/order/icon/dingwei.png" mode=""></image>
						</view>
						<view class="tell">
							<text>电话:</text>
							<text>13318969277</text>
							<image class="icons" src="../../static/images/order/icon/tell.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="checkinCost">
				<view class="details">
					<text>线上支付</text>
					<text>￥228</text>
					<text>费用明细</text>
					<image class="icons" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
				</view>
				<view class="deposit">
					<text>押金</text>
					<text>免押金</text>
				</view>
				<view class="invoice">
					<text>发票</text>
					<text>不需开具发票</text>
					<image class="icons" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
				</view>
			</view>
			<view class="reserve">
				<view><text>预订人信息</text></view>
				<view>
					<text>预订人</text>
					<text>张飞</text>
				</view>
				<view>
					<text>联系人手机</text>
					<text>15913570532</text>
				</view>
			</view>
			<view class="orderDate">
				<view><text>订单信息</text></view>
				<view>
					<text>订单编号</text>
					<text>7955630702</text>
				</view>
				<view>
					<text>下单时间</text>
					<text>2019-02-28 17:31:10</text>
				</view>
			</view>
		</view>
		<view class="bottomBtn">
			<button :class="active == 1 ? 'active' : ''" @click="changeActive(1)">一键续房</button>
			<button :class="active == 2 ? 'active' : ''" @click="changeActive(2)">退房</button>
		</view>
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
			active: 1
		};
	},
	onPageScroll(Object) {},
	methods: {
		changeActive: function(e) {
			if (e == 1) {
				this.active = 1;
				uni.navigateTo({
					url:'../payment/payment'
				});
			} else {
				this.active = 2;
			}
		},
		goRoom: function() {
			uni.navigateTo({
				url: '../roomDetails/roomDetails'
			});
		}
	}
};
</script>

<style>

.orderPage .orderDetails {
	width: 100%;
	height: 100%;
	overflow: hidden;
	margin-bottom: 96upx;
	background-color: #f5f9fc;
}
.orderPage .orderDetails > view {
	background-color: white;
	margin-bottom: 30upx;
	padding: 0 23.55072upx 0 23.55072upx;
	font-size: 30upx;
}
.orderPage .orderDetails .markedwords {
	padding: 40upx 0;
}
.orderPage .orderDetails .markedwords text {
	text-align: center;
	display: block;
}
.orderPage .orderDetails .markedwords text:nth-child(1) {
	color: #cda754;
	font-size: 43.47826upx;
	font-weight: bold;
	margin-bottom: 25upx;
}
.orderPage .orderDetails .markedwords text:nth-child(2) {
	color: #666;
	font-size: 27.17391upx;
}
.orderPage .orderDetails .warmPrompt .warm-title {
	padding: 20upx 10upx;
	border-bottom: 1px solid #f7f9fb;
	font-size: 27.17391upx;
}
.orderPage .orderDetails .warmPrompt .warm-content {
	display: flex;
	font-size: 27.17391upx;
}
.orderPage .orderDetails .warmPrompt .warm-content .warm-left {
	flex: 0.2;
	padding-left: 10upx;
	padding-top: 20upx;
	color: #666666;
}
.orderPage .orderDetails .warmPrompt .warm-content .warm-right {
	flex: 0.8;
	padding: 20upx 0 20upx 10upx;
	color: #333333;
}
.orderPage .orderDetails .checkin .checkindate {
	display: flex;
	padding: 28.9855upx 0;
	border-bottom: 1px dashed #eee;
}
.orderPage .orderDetails .checkin .checkindate view {
	flex: 1;
	text-align: center;
	line-height: 50upx;
	display: box;
	box-pack: center;
	box-orient: vertical;
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-orient: vertical;
	color: #666666;
}
.orderPage .orderDetails .checkin .checkindate view > p:nth-child(1) {
	font-size: 25.36231upx;
}
.orderPage .orderDetails .checkin .checkindate view > p:nth-child(2) {
	font-size: 27.17391upx;
	font-weight: 600;
}
.orderPage .orderDetails .checkin .checkindate .cy {
	color: #cda754;
	font-size: 25.36231upx;
}
.orderPage .orderDetails .checkin .checkinCard {
	padding-top: 9.05797upx;
	font-size: 25.36231upx;
}
.orderPage .orderDetails .checkin .checkinCard .checkinName > image {
	width: 36.23188upx;
	height: 36.23188upx;
	float: right;
	position: relative;
	top: -19.92753upx;
}
.orderPage .orderDetails .checkin .checkinCard .checkinName {
	margin: 19.92753upx 0;
}
.orderPage .orderDetails .checkin .checkinCard .checkinName > p:nth-child(1) {
	font-size: 27.17391upx;
}
.orderPage .orderDetails .checkin .checkinCard .checkinName > h3 {
	font-weight: 400;
	line-height: 38.04347upx;
	font-size: 27.17391upx;
}
.orderPage .orderDetails .checkin .checkinCard .checkinName > .cc {
	color: #8e9093;
	line-height: 38.04347upx;
}

.orderPage .orderDetails .checkin .checkinCard .houseImg {
	width: 100%;
	height: 463.76811upx;
}
.orderPage .orderDetails .checkin .checkinCard .checkinAddress {
	color: #8e9093;
}
.orderPage .orderDetails .checkin .checkinCard .checkinAddress > view {
	line-height: 63.40579upx;
}
.orderPage .orderDetails .checkin .checkinCard .checkinAddress .icons {
	display: inline-block;
	float: right;
	width: 39.85507upx;
	height: 39.85507upx;
	margin-top: 9.05797upx;
	position: none;
}

.orderPage .orderDetails .checkinCost,
.orderPage .orderDetails .reserve,
.orderPage .orderDetails .orderDate {
	color: #666666;
	font-size: 25.36231upx;
}
.orderPage .orderDetails .checkinCost > view .icons {
	width: 39.85507upx;
	height: 39.85507upx;
	position: relative;
	top: 9.05797upx;
}
.orderPage .orderDetails .checkinCost > view {
	border-bottom: 1px solid #f7f9fb;
}
.orderPage .orderDetails .checkinCost .details,
.orderPage .orderDetails .checkinCost .deposit,
.orderPage .orderDetails .checkinCost .invoice {
	line-height: 88upx;
}
.orderPage .orderDetails .checkinCost .details,
.orderPage .orderDetails .checkinCost .deposit,
.orderPage .orderDetails .checkinCost .invoice {
	text-align: right;
}

.orderPage .orderDetails .checkinCost .details > text:nth-child(1),
.orderPage .orderDetails .checkinCost .details > text:nth-child(2) {
	float: left;
}
.orderPage .orderDetails .checkinCost .details > text:nth-child(2) {
	margin-left: 20upx;
	color: #cda754;
}

.orderPage .orderDetails .checkinCost .deposit > text:nth-child(1) {
	float: left;
}

.orderPage .orderDetails .checkinCost .invoice > text:nth-child(1) {
	float: left;
}

.orderPage .orderDetails .reserve > view,
.orderPage .orderDetails .orderDate > view {
	line-height: 86.95652upx;
	border-bottom: 1px solid #f7f9fb;
}
.orderPage .orderDetails .reserve > view > text:nth-child(2),
.orderPage .orderDetails .orderDate > view > text:nth-child(2) {
	color: #333333;
	margin-left: 30upx;
	font-weight: 500;
}
.orderPage .bottomBtn {
	width: 100%;
	text-align: right;
	position: fixed;
	bottom: 0;
	margin: 0;
	padding: 20upx 0;
	background-color: white;
	border-top: 1px solid #f1f1f1;
}
.orderPage .bottomBtn > button {
	display: inline-block;
	float: right;
	height: 56upx;
	font-size: 28upx;
	line-height: 56upx;
	margin-right: 20upx;
	color: #cda754;
	background: white;
}
.orderPage .bottomBtn > .active {
	background-color: #cda754;
	color: white;
}
</style>
