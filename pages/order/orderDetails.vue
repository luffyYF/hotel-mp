<template>
	<view class="orderPage" v-cloak>
		<view class="orderDetails">
			<view class="markedwords">
				<text>{{ orderDetails.statusTitle }}</text>
				<text>{{ orderDetails.statusMsg }}</text>
			</view>
			<view class="warmPrompt">
				<view class="warm-title"><text>温馨提示</text></view>
				<view class="warm-content">
					<view class="warm-left"><text>入住说明</text></view>
					<view class="warm-right">
						<text>
							请携带所有入住人的有效身份证，报预定人姓名，于{{ orderDetails.beginDate }}当天14:00后办理入住，于{{
								orderDetails.endDate
							}}当天12点前退房，如需提前入住或延迟退房请联系商家
						</text>
					</view>
				</view>
			</view>
			<view class="checkin">
				<view class="checkindate">
					<view>
						<p>入住</p>
						<p>{{ orderDetails.beginDate }}</p>
					</view>
					<view class="cy">
						<text>{{ orderDetails.nights }}晚</text>
					</view>
					<view>
						<p>离开</p>
						<p>{{ orderDetails.endDate }}</p>
					</view>
				</view>
				<view class="checkinCard">
					<view class="checkinName">
						<h3>{{ orderDetails.companyName }}</h3>
						<text class="cc">{{ orderDetails.roomTypeName }}{{ '(' + orderDetails.rentCount + '间)' }}</text>
						<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>

					<image class="houseImg" :src="IMGURL + orderDetails.coverImage" mode=""></image>
					<view class="checkinAddress">
						<view class="Address">
							<view class="title">
								<text>地址:</text>
								<text>{{ orderDetails.companyAddress }}</text>
							</view>
							<view class="addressIcon"><image class="icons" src="../../static/images/order/icon/dingwei.png" mode=""></image></view>
						</view>
						<view class="tell" @tap="makingCall('13318969277')">
							<text>电话:</text>
							<text>13318969277</text>
							<image class="icons" src="../../static/images/order/icon/tell.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="checkinCost">
				<view class="details" @tap="gotoCost">
					<text>线上支付</text>
					<text>￥{{ orderDetails.totalPrice }}</text>
					<text>费用明细</text>
					<image class="icons" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
				</view>
				<view class="deposit">
					<text>押金</text>
					<text>免押金</text>
				</view>
				<view class="invoice" @tap="orderDetails.invoiceType != 0 ? checkInvoice() : ''">
					<text>发票</text>
					<text>{{ orderDetails.invoiceType == 0 ? '无需开具发票' : '查看发票' }}</text>
					<image class="icons" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
				</view>
			</view>
			<view class="reserve">
				<view><text>预订人信息</text></view>
				<view>
					<text>预订人</text>
					<text>{{ orderDetails.userName }}</text>
				</view>
				<view>
					<text>联系人手机</text>
					<text>{{ orderDetails.userPhone }}</text>
				</view>
			</view>
			<view class="orderDate">
				<view><text>订单信息</text></view>
				<view>
					<text>订单编号</text>
					<text>{{ orderDetails.orderNo }}</text>
				</view>
				<view>
					<text>下单时间</text>
					<text>{{ orderDetails.createTime }}</text>
				</view>
			</view>
		</view>
		<view class="bottomBtn" v-if="orderDetails.showBtn">
			<button v-if="orderDetails.btnTitle[0].isShow" :class="active == 1 ? 'active' : ''" @click="orderDetails.OperationMethod[0]()">
				{{ orderDetails.btnTitle[0].title }}
			</button>
			<button v-if="orderDetails.btnTitle[1].isShow" :class="active == 2 ? 'active' : ''" @click="orderDetails.OperationMethod[1]()">
				{{ orderDetails.btnTitle[1].title }}
			</button>
		</view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
export default {
	components: {},
	data() {
		return {
			active: 1,
			orderDetails: {},
			IMGURL: ''
		};
	},
	onLoad(opt) {
		/* console.log(JSON.parse(opt.orderDetails)); */
		console.log(JSON.parse(opt.orderDetails));
		this.orderDetails = JSON.parse(opt.orderDetails);

		this.IMGURL = api.config.IMGURL;
		switch (this.orderDetails.orderStatus) {
			case 0:
				this.orderDetails.statusTitle = '待付款';
				this.orderDetails.statusMsg = '订单已下单，请尽快付款';
				this.orderDetails.btnTitle = [{ title: '一键付款', isShow: true }, { title: '取消订单', isShow: true }];
				this.orderDetails.OperationMethod = [this.AkeyPayment, this.cancelOrder];
				this.orderDetails.showBtn = true;
				break;
			case 1:
				this.orderDetails.statusTitle = '待接单';
				this.orderDetails.statusMsg = '订单已付款，请等待接单';
				this.orderDetails.btnTitle = [{ title: '一键付款', isShow: false }, { title: '取消订单', isShow: true }];
				this.orderDetails.OperationMethod = [this.cancelOrder, this.cancelOrder];
				this.orderDetails.showBtn = true;
				break;
			case 2:
				this.orderDetails.statusTitle = '已接单';
				this.orderDetails.statusMsg = '订单已接单，请尽快到达酒店入住';
				this.orderDetails.btnTitle = [{ title: '一键付款', isShow: false }, { title: '取消订单', isShow: true }];
				this.orderDetails.OperationMethod = [this.cancelOrder, this.cancelOrder];
				this.orderDetails.showBtn = true;
				break;
			case 3:
				this.orderDetails.statusTitle = '已入住';
				this.orderDetails.statusMsg = '您已入住，请好好享用';
				this.orderDetails.btnTitle = [{ title: '一键付款', isShow: false }, { title: '取消订单', isShow: true }];
				this.orderDetails.OperationMethod = [this.cancelOrder, this.cancelOrder];
				this.orderDetails.showBtn = true;
				break;
			case 4:
				this.orderDetails.statusTitle = '取消中';
				this.orderDetails.statusMsg = '订单正取消中，请稍等片刻';
				this.orderDetails.showBtn = false;
				break;
			case 5:
				this.orderDetails.statusTitle = '已取消';
				this.orderDetails.statusMsg = '订单已取消，欢迎您的下次光临';
				this.orderDetails.showBtn = false;
				break;
			case 6:
				this.orderDetails.statusTitle = '已完成';
				this.orderDetails.statusMsg = '订单已完成，欢迎您的下次光临';
				this.orderDetails.showBtn = false;
				break;
			default:
				break;
		}
		var strDateStart = this.orderDetails.beginDate;
		var strDateEnd = this.orderDetails.endDate;
		this.orderDetails.nights = this.getDays(strDateStart, strDateEnd);
	},
	methods: {
		goRoom: function() {
			uni.navigateTo({
				url: '../roomDetails/roomDetails'
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
		gotoCost() {
			api.getOrderPrice({
				beginDate: this.orderDetails.beginDate,
				couponMemberPk: this.orderDetails.couponMemberPk == null ? '' : this.orderDetails.couponMemberPk,
				endDate: this.orderDetails.endDate,
				rentCount: this.orderDetails.rentCount,
				roomTypePk: this.orderDetails.roomTypePk,
				userPk: this.orderDetails.userPk
			}).then(res => {
				if (res.code == 1) {
					uni.navigateTo({
						url: '../costDetail/costDetail?details=' + JSON.stringify(res.data)
					});
				}
			});
		},
		makingCall(phoneNumber) {
			uni.makePhoneCall({
				phoneNumber: phoneNumber
			});
		},
		//取消订单
		cancelOrder() {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '是否取消订单',
				success: function(res) {
					if (res.confirm) {
						api.cancelOrder({
							orderPk: that.orderDetails.orderPk,
							userPk: that.orderDetails.userPk
						}).then(res => {
							if (res.success) {
								uni.navigateBack();
								uni.showToast({
									title: '订单已取消',
									duration: 1500
								});
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		//一键付款
		AkeyPayment() {
			console.log(this.orderDetails);
			var obj = {
				orderPk: this.orderDetails.orderPk,
				totalPrice: this.orderDetails.totalPrice,
				userPk: this.orderDetails.userPk
			};
			uni.navigateTo({
				url: '../payment/payment?obj=' + JSON.stringify(obj)
			});
		},
		//查看发票
		checkInvoice() {
			var orderDetails = this.orderDetails;
			var obj = {
				companyTaxNo: orderDetails.companyTaxNo,
				invoiceCompanyAddress: orderDetails.invoiceCompanyAddress,
				invoiceCompanyPhone: orderDetails.invoiceCompanyPhone,
				invoiceTitle: orderDetails.invoiceTitle,
				invoiceType: orderDetails.invoiceType,
				openingAccount: orderDetails.openingAccount,
				openingBank: orderDetails.openingBank,
				receiveAddress: orderDetails.receiveAddress,
				receiveName: orderDetails.receiveName,
				receivePhone: orderDetails.receivePhone,
				recipientEmail: orderDetails.recipientEmail,
				recipientName: orderDetails.recipientName,
				recipientPhone: orderDetails.recipientPhone,
				riseType: orderDetails.riseType,
				totalPrice: orderDetails.totalPrice
			};
			uni.navigateTo({
				url: '../invoice/selInvoice?invoiceInfo=' + JSON.stringify(obj)
			});
		}
	}
};
</script>

<style>
[v-cloak] {
	display: none;
}
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
.orderPage .orderDetails .checkin .checkinCard .checkinAddress > .Address {
	display: flex;
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
