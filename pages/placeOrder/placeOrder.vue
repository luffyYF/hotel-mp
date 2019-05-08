<template>
	<view class="fillorderPage">
		<view class="orderContent">
			<view class="room-info" @tap="gotoRoom">
				<h2>{{ roomTypeInfo.typeName }}</h2>
				<p class="tags">
					<span>{{ roomTypeInfo.area }}</span>
					<span>{{ roomTypeInfo.bathroomDesc }}</span>
					<span>{{ roomTypeInfo.breakfastDesc }}</span>
					<span>{{ roomTypeInfo.windowDesc }}</span>
					<span>{{ roomTypeInfo.broadbandDesc }}</span>
					<span>{{ roomTypeInfo.airConditionerDesc }}</span>
					<span>{{ roomTypeInfo.bathroomMatchingDesc }}</span>
				</p>
				<p class="intime">
					入住：
					<span class="days">{{ globalData.checkIn.month }}月{{ globalData.checkIn.day }}号</span>
					离店：
					<span class="days">{{ globalData.checkOut.month }}月{{ globalData.checkOut.day }}号</span>
					<span>共{{ (globalData.checkOut.timeStamp - globalData.checkIn.timeStamp) / 86400000 }}晚</span>
				</p>
			</view>
			<view class="reserve-msg">
				<span class="reserve-title">预订信息</span>
				<view class="reserve-content">
					<view class="room-count">
						<p>房间数</p>
						<p>
							<image src="../../static/images/order/sub.png" mode="" @tap="roomNumber('sub')"></image>
							<span>{{ rentCount }}</span>
							<image src="../../static/images/order/add.png" mode="" @tap="roomNumber('add')"></image>
						</p>
					</view>
					<view class="reserve-user">
						<p>预订人</p>
						<p>
							<image src="../../static/images/order/user.png" mode=""></image>
							<span><input type="text" v-model="userInfo.memName" placeholder="请填写姓名" /></span>
						</p>
					</view>
					<view class="tellphone">
						<p>手机号码</p>
						<p><input type="number" v-model="userInfo.memPhone" placeholder="请填写手机号码" /></p>
					</view>
				</view>
			</view>
			<view class="discounts">
				<span class="reserve-title">平台优惠</span>
				<view class="discounts1"><p>已享用：会员优惠</p></view>
				<view class="discounts2" @tap="gotoDiscounts">
					<p>优惠卷</p>

					<p>{{ selCoupons.hasOwnProperty('couponMemberPk') ? selCoupons.couponName : couponCount > 0 ? '有' + couponCount + '张优惠劵可用' : '无优惠劵可用' }}</p>
				</view>
			</view>
			<view class="invoice">
				<view class="invoice1" @tap="gotoInvoice(invoiceTypes)" :disabled='invoiceTypes==0?true:false'>
					<p>发票</p>
					<p>
						<span>{{invoiceTypes==0?'不提供发票':'提供发票'}}</span>
						<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</p>
				</view>
				<view class="invoice2">
					<p>个性化服务</p>
					<p>
						<span v-for="(item, index) in selectAll" :key="index" v-if="item.state">{{ item.name }}</span>
					</p>
				</view>
			</view>
			<view class="ServiceOptions">
				<button :class="item.state == 1 ? 'selectBtn' : ''" v-for="(item, index) in selectAll" :key="index" @tap="addItem(item)">{{ item.name }}</button>
			</view>
			<view class="Specialtips">
				<p>
					特别提示:
					<span>
						本订单预定成功后，根据“
						<a href="#">取消订单规则</a>
						”退款
					</span>
				</p>
			</view>
		</view>
		<view class="operation">
			<button class="orderPrice" @tap="gotoCost">
				<span>￥{{ totalPrice.totalPrice }}</span>
				<span style="font-size: 18.11594upx;text-decoration: line-through;margin-left: -90.57971upx;color: #ccc;">￥{{ totalPrice.oldTotalPrice }}</span>
				<span @tap="gotoCost()">明细</span>
			</button>
			<button class="submitOrder" @tap="gotoPayment()">提交订单</button>
		</view>
	</view>
</template>

<script>
import api from '@/utils/api';
import allocation from '@/utils/config';
import user from '@/services/user.js';
export default {
	data() {
		return {
			selectAll: [
				{ name: '无烟', state: false },
				{ name: '宵夜', state: false },
				{ name: '晨跑套装', state: false },
				{ name: '有小孩', state: false },
				{ name: '有老人', state: false },
				{ name: '有孕妇', state: false },
				{ name: '电影院', state: false }
			],
			//房间信息
			roomTypeInfo: {},
			//日期时间
			globalData: {},
			//开始时间
			beginDate: '',
			//结束时间
			endDate: '',
			//房间数量
			rentCount: 1,
			//选择优惠劵
			selCoupons: {},
			//优惠卷数量
			couponCount: '',
			//可预订房间数
			bookableCount: '',
			//总价
			totalPrice: {},
			//用户信息
			userInfo: {},
			//是否提供发票
			invoiceTypes:''
		};
	},
	onLoad(opt) {
		var obj = JSON.parse(opt.roomInfo);
		//房间信息和入住时间
		this.roomTypeInfo = obj.roomTypeInfo;
		this.globalData = obj.globalData;
		this.beginDate = obj.beginDate;
		this.endDate = obj.endDate;
	},
	onShow(e) {
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		let that = this;
		that.selCoupons = currPage.data.selCoupons;

		user.isUserinfo().then(res => {
			user.getUserInfo().then(res => {
				that.setTotalPrice(res);
			});
		});
		api.createOrderInfo({
			beginDate: that.beginDate,
			companyPk: allocation.COMPANYPK,
			endDate: that.endDate,
			roomTypePk: that.roomTypeInfo.typePk,
			userPk: that.userInfo.userPk
		}).then(res => {
			//优惠卷数量
			that.couponCount = res.data.couponCount;
			//可预订房间数
			that.bookableCount = res.data.bookableCount;
			//是否提供发票
			that.invoiceTypes=res.data.invoiceTypes;
		});
	},
	methods: {
		//支付下单
		gotoPayment() {
			var that = this;
			if (this.userInfo.name == '' || this.userInfo.tellphone == '') {
				uni.showToast({
					title: '请填写个人信息',
					image: '../../static/images/order/icon/shibai.png',
					mask: true,
					duration: 1000
				});
			} else {
				var personalization = '';
				for (var i = 0; i < this.selectAll.length; i++) {
					if (this.selectAll[i].state == true) {
						personalization += this.selectAll[i].name + ',';
					}
				}
				/* console.log(personalization);
				console.log(this.userInfo); */

				api.createOrder({
					beginDate: this.beginDate,
					endDate: this.endDate,
					rentCount: this.rentCount,
					roomTypePk: this.roomTypeInfo.typePk,
					userName: this.userInfo.memName,
					userPhone: this.userInfo.memPhone,
					personalization: personalization,
					userPk: this.userInfo.memPk
				}).then(res => {
					if (res.code == 1) {
						console.log(res.data);
						var obj = {
							orderPk: res.data,
							totalPrice: that.totalPrice.totalPrice,
							userPk:that.userInfo.memPk
						};
						uni.navigateTo({
							url: '../payment/payment?obj=' + JSON.stringify(obj)
						});
					}
				});
			}
		},
		//选择优惠卷
		gotoDiscounts() {
			api.lisCouponByUser({
				roomTypePk: this.roomTypeInfo.typePk,
				userPk: this.userInfo.memPk
			}).then(res => {
				if (res.code == 1) {
					uni.navigateTo({
						url: '../discounts/discounts?obj=' + JSON.stringify(res.data)
					});
				}
			});
		},

		//添加个性化服务
		addItem(item) {
			item.state = !item.state;
		},
		//设置房间数
		roomNumber(flag) {
			if (flag == 'add') {
				if (this.rentCount >= this.bookableCount) {
					console.log(this.bookableCount)
					uni.showToast({
						title: '已经是最大房间限额',
						image: '../../static/images/order/icon/shibai.png',
						mask: true,
						duration: 1500
					});
				} else {
					this.rentCount++;
					this.setTotalPrice(this.userInfo);
				}
			} else {
				if (this.rentCount <= 1) {
					uni.showToast({
						title: '已经是最小房间限额',
						image: '../../static/images/order/icon/shibai.png',
						mask: true,
						duration: 1500
					});
				} else {
					this.rentCount--;
					this.setTotalPrice(this.userInfo);
				}
			}
		},
		//房型详情
		gotoRoom() {
			/* uni.navigateTo({
				url: '../roomDetails/roomDetails'
			}); */
		},
		//设置总价
		setTotalPrice(userInfo) {
			this.userInfo = userInfo;
			if (this.selCoupons.hasOwnProperty('couponMemberPk')) {
				api.getOrderPrice({
					beginDate: this.beginDate,
					couponMemberPk: this.selCoupons.couponMemberPk,
					endDate: this.endDate,
					rentCount: this.rentCount,
					roomTypePk: this.roomTypeInfo.typePk,
					userPk: userInfo.memPk
				}).then(res => {
					if (res.code == 1) {
						this.totalPrice = res.data;
					}
				});
			} else {
				api.getOrderPrice({
					beginDate: this.beginDate,
					couponMemberPk: '',
					endDate: this.endDate,
					rentCount: this.rentCount,
					roomTypePk: this.roomTypeInfo.typePk,
					userPk: userInfo.memPk
				}).then(res => {
					if (res.code == 1) {
						this.totalPrice = res.data;
					}
				});
			}
		},
		//查看明细
		gotoCost() {
			let that = this;

			if (this.selCoupons.hasOwnProperty('couponMemberPk')) {
				api.getOrderPrice({
					beginDate: this.beginDate,
					couponMemberPk: this.selCoupons.couponMemberPk,
					endDate: this.endDate,
					rentCount: this.rentCount,
					roomTypePk: this.roomTypeInfo.typePk,
					userPk: this.userInfo.memPk
				}).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: '../costDetail/costDetail?details=' + JSON.stringify(res.data)
						});
					}
				});
			} else {
				api.getOrderPrice({
					beginDate: this.beginDate,
					couponMemberPk: '',
					endDate: this.endDate,
					rentCount: this.rentCount,
					roomTypePk: this.roomTypeInfo.typePk,
					userPk: this.userInfo.memPk
				}).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: '../costDetail/costDetail?details=' + JSON.stringify(res.data)
						});
					}
				});
			}
		},
		//申请发票
		gotoInvoice(invoiceTypes){
			uni.navigateTo({
				url:'../invoice/invoice?invoiceTypes='+invoiceTypes
			})
		}
	}
};
</script>

<style>
.fillorderPage {
	background-color: #f5f9fc;
	overflow: hidden;
}
.fillorderPage .orderContent {
	margin-bottom: 81.52173upx;
}
.fillorderPage .orderContent .room-info {
	background-color: white;
	padding: 18.11594upx 28.9855upx;
	margin-bottom: 28.9855upx;
}
.fillorderPage .orderContent .room-info > h2 {
	font-size: 28.9855upx;
	font-weight: 400;
}
.fillorderPage .orderContent .room-info > h2 > span {
	font-size: 25.36231upx;
	color: #cda754;
	display: flex;
	float: right;
	vertical-align: middle;
	align-items: center;
}
.fillorderPage .orderContent .room-info > h2 > span > image {
	width: 28.9855upx;
	height: 28.9855upx;
}
.fillorderPage .orderContent .room-info > h2 > p,
.fillorderPage .orderContent .room-info > .tags {
	font-size: 25.36231upx;
}
.fillorderPage .orderContent .room-info > .tags > span {
	padding-right: 21.73913upx;
}
.fillorderPage .orderContent .room-info > h2 > p > .days {
	color: #cda754;
}
.fillorderPage .orderContent .room-info > h2 > p > span {
	margin: 5.43478upx;
}
.fillorderPage .orderContent .room-info > p {
	font-size: 25.36231upx;
}
.fillorderPage .orderContent .room-info > .intime > .days {
	margin: 18.11594upx;
}
.fillorderPage .reserve-msg,
.fillorderPage .discounts {
	background-color: white;
	margin: 57.97101upx 0 28.9855upx 0;
	position: relative;
}
.fillorderPage .reserve-msg .reserve-title {
	background: #cda754;
	color: #fff;
	float: left;
	height: 36.23188upx;
	padding: 0 18.11594upx;
	font-size: 21.73913upx;
	border-radius: 10.86956upx 10.86956upx 0 0;
	margin-left: 27.17391upx;
	position: absolute;
	top: -36.23188upx;
}
.fillorderPage .reserve-msg .reserve-content > view,
.fillorderPage .discounts > view,
.fillorderPage .invoice > view {
	padding: 19.92753upx 28.9855upx;
	font-size: 25.36231upx;
	display: flex;
	vertical-align: middle;
	align-items: center;
}
.fillorderPage .reserve-msg .reserve-content > view:nth-child(1) {
	border-bottom: 1px solid #f7f9fb;
}
.fillorderPage .reserve-msg .reserve-content > view:nth-child(2) {
	border-bottom: 1px solid #f7f9fb;
}
.fillorderPage .reserve-msg .reserve-content > view > p:nth-child(1) {
	flex: 0.7;
}
.fillorderPage .reserve-msg .reserve-content > view > p:nth-child(2) {
	flex: 0.3;
	display: flex;
	vertical-align: middle;
	align-items: center;
	justify-content: center;
}
.fillorderPage .reserve-msg .reserve-content > view image {
	width: 36.23188upx;
	height: 36.23188upx;
}
.fillorderPage .reserve-msg .reserve-content .room-count > p:nth-child(2) > span {
	flex: 1;
	text-align: center;
}
.fillorderPage .reserve-msg .reserve-content .reserve-user > p:nth-child(2) > span {
	flex: 1;
	text-align: center;
}

.fillorderPage .discounts .reserve-title {
	background: #cda754;
	color: #fff;
	float: left;
	height: 36.23188upx;
	padding: 0 18.11594upx;
	font-size: 21.73913upx;
	border-radius: 10.86956upx 10.86956upx 0 0;
	margin-left: 27.17391upx;
	position: absolute;
	top: -36.23188upx;
}
.fillorderPage .discounts .discounts1 {
	border-bottom: 1px solid #f7f9fb;
	color: #cda754;
	clear: both;
}
.fillorderPage .discounts .discounts2 {
	display: flex;
}
.fillorderPage .discounts .discounts2 > p {
	flex: 1;
}

.fillorderPage .discounts .discounts2 > p:nth-child(2) {
	text-align: right;
	color: #cda754;
}
.fillorderPage .invoice {
	background-color: white;
}
.fillorderPage .invoice .invoice1 {
	border-bottom: 1px solid #f7f9fb;
}
.fillorderPage .invoice .invoice1 > p:nth-child(1) {
	flex: 0.2;
}

.fillorderPage .invoice .invoice1 > p:nth-child(2) {
	flex: 0.8;
	display: flex;
	vertical-align: middle;
	align-items: center;
	justify-content: flex-end;
	color: #999999;
}

.fillorderPage .invoice .invoice1 > p > image {
	width: 28.9855upx;
	height: 28.9855upx;
}

.fillorderPage .invoice .invoice2 > p:nth-child(1) {
	flex: 0.3;
}

.fillorderPage .invoice .invoice2 > p:nth-child(2) {
	flex: 0.8;
	text-align: right;
}
.fillorderPage .invoice .invoice2 > p:nth-child(2) > span {
	padding: 0 9.05797upx;
}
.fillorderPage .ServiceOptions {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.fillorderPage .ServiceOptions > .selectBtn {
	background: linear-gradient(to bottom, #cda754, #cbbe85) !important;
	color: #fff !important;
}
.fillorderPage .ServiceOptions > button {
	flex: 0 0 20%;
	width: 22%;
	margin: 18.11594upx;
	max-width: 22%;
	height: 30px;
	line-height: 28px;
	font-size: 23.55072upx;
	color: #000 !important;
	border: 1px solid rgba(0, 0, 0, 0.2);
}
.fillorderPage .ServiceOptions > button::after {
	border: none;
}
.fillorderPage .Specialtips {
	font-size: 23.55072upx;
	padding: 0 18.11594upx;
}
.fillorderPage .Specialtips > p > span {
	color: #666666;
}
.fillorderPage .Specialtips > p > span > a {
	color: #cda754;
	display: inline;
}
.operation {
	width: 100%;
	height: 81.52173upx;
	display: flex;
	position: fixed;
	bottom: 0;
	vertical-align: middle;
	align-items: center;
}
.operation > .orderPrice {
	flex: 1;
	border: none;
	height: 100%;
	line-height: 81.52173upx;
	justify-content: center;
	border-radius: inherit;
	background-color: white;
	font-size: 25.36231upx;
	font-weight: bold;
	color: #f72845;
}
.operation > .orderPrice > span:nth-child(1) {
	color: #f72845;
	font-size: 36.23188upx;
	float: left;
}
.operation > .orderPrice > span:nth-child(3) {
	color: #333333;
	font-size: 21.73913upx;
	float: right;
}

.operation > .orderPrice:after {
	border: none;
}

.operation > .submitOrder {
	flex: 1;
	height: 100%;
	justify-content: center;
	line-height: 81.52173upx;
	border: none;
	background-color: #cda754;
	border-radius: inherit;
	font-size: 28.9855upx;
	font-weight: bold;
	color: #fff;
}
.operation > .submitOrder:after {
	border: none;
}
</style>
