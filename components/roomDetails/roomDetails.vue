<template>
	<view class="page" v-cloak>
		<view class="masklayer"></view>
		<view class="roomTop">
			<h2>{{ roomTypeInfo.typeName }}[人气精选预付价]</h2>
			<image src="../../static/images/room/error.png" mode="" @tap="closePage"></image>
		</view>
		<scroll-view :scroll-y="true" class="roomPage">
			<uniSwiperDot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in info" :key="index" style="width: 100%;height: 100%;">
						<view class="swiper-item" style="width: 100%;height: 100%;">
							<image style="width: 100%;height: 100%;" :src="IMGURL + item.imgUrl" mode="" class="swiper-item-img"></image>
						</view>
					</swiper-item>
				</swiper>
			</uniSwiperDot>
			<view class="roominfo">
				<view class="infoRow">
					<view class="info-left">
						<view>
							<span>面积:</span>
							<p>{{ roomTypeInfo.area }}</p>
						</view>
						<view>
							<span>楼层:</span>
							<p>{{ roomTypeInfo.disPrice }}</p>
						</view>
						<view>
							<span>可住:</span>
							<p>{{ roomTypeInfo.customerNum }}</p>
						</view>
						<view>
							<span>卫浴:</span>
							<p>{{ roomTypeInfo.bathroomDesc }}</p>
						</view>
					</view>
					<view class="info-right">
						<view>
							<span>早餐:</span>
							<p>{{ roomTypeInfo.breakfastDesc }}</p>
						</view>
						<view>
							<span>窗户:</span>
							<p>{{ roomTypeInfo.windowDesc }}</p>
						</view>
						<view>
							<span>宽带:</span>
							<p>{{ roomTypeInfo.broadbandDesc }}</p>
						</view>
						<view>
							<span>空调:</span>
							<p>{{ roomTypeInfo.airConditionerDesc }}</p>
						</view>
					</view>
				</view>
				<view class="infobottom">
					<span>浴室配套:</span>
					<p>{{ roomTypeInfo.bathroomMatchingDesc }}</p>
				</view>
			</view>
			<!-- <view class="sales">
				<h2>促销活动</h2>
				<view class="sales-item">
					<span>返现3元</span>
					<p>离店后60天内可领返现3元</p>
					<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
				</view>
				<view class="sales-item">
					<span>连住优惠</span>
					<p>高星酒店订2晚以上，每晚减3元</p>
					<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
				</view>
				<view class="sales-item">
					<span>砍价拿返现</span>
					<p>活动期间首单支付成功后，最高可砍8地方地方地方</p>
					<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
				</view>
			</view> -->
			<view class="description">
				<view class="des">
					<h2>不可取消</h2>
					<ul>
						<li><p>订单确认后不可变更/取消，如未入住，酒店将扣除全额房费</p></li>
					</ul>
				</view>
				<view class="des">
					<h2>预定说明</h2>
					<ul>
						<li><p>请在15分钟内确认订单</p></li>
						<li><p>发票有代理商开具，如需发票，请在下单时填写发票信息</p></li>
					</ul>
				</view>
				<view class="des">
					<h2>使用规则</h2>
					<ul>
						<li><p>直接消费，无需美团劵，携带所有入住人的有效身份证件办理入住，入住必须按照一人一证</p></li>
						<li><p>请于14:00之后入住并与次日13:00之前退房；</p></li>
						<li><p>如需提前入住或延时退房，请咨询商家</p></li>
						<li><p>入住需要押金，金额以前台为准</p></li>
					</ul>
				</view>
			</view>
		</scroll-view>
		<view class="operation">
			<button class="reserveBtn" style="" @tap="gotoPrice()" :disabled="roomTypeInfo.isFull == 'Y' ? true : false">
				<span>￥{{ roomTypeInfo.disPrice }}</span>
				<span style="font-size: 21.73913upx;text-decoration: line-through;margin-right: 18.11594upx;color: #ccc;">￥{{ roomTypeInfo.price }}</span>
				<!-- <span style="font-size: 36.23188upx;flex: 1;text-align: right;">{{ roomTypeInfo.isFull == 'Y' ? '今日已满' : '预定' }}</span> -->
			</button>
			<button class="contactBtn" @tap="makingCall('12345678910')" style="background-color: #baa785;color: #333;">联系客服</button>
			<button
				class="contactBtn"
				@tap="gotoPrice()"
				:disabled="roomTypeInfo.isFull == 'Y' ? true : false"
				style="font-size: 36.23188upx;background-color: #43403a;color: #e0c475;"
			>
				{{ roomTypeInfo.isFull == 'Y' ? '今日已满' : '预定' }}
			</button>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '../../components/uni-swiper-dot/uni-swiper-dot.vue';
import api from '@/utils/api.js';
import allocation from '@/utils/config.js';
export default {
	props: {
		roomData: {}
	},
	components: {
		uniSwiperDot
	},
	created() {
		let that = this;

		if (that.roomData.code == 1) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});

			setTimeout(function() {
				uni.hideLoading();
			}, 1000);
			//房间信息
			that.roomTypeInfo = that.roomData.data.roomTypeInfo;
			//图片数组
			that.info = that.roomData.data.images;
			//入住时间
			that.globalData = that.roomData.globalData;

			//开始入住时间
			that.beginDate = that.roomData.beginDate;
			//开始退房时间
			that.endDate = that.roomData.endDate;

			//图片站点
			this.IMGURL = allocation.IMGROOTURL;
		}
	},
	mounted() {},
	data() {
		return {
			info: [],
			current: 0,
			mode: 'long',
			IMGURL: '',
			roomTypeInfo: {},
			globalData: {},
			beginDate: '',
			endDate: ''
		};
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		gotoPrice() {
			let that = this;
			user.isUserinfo()
				.then(res => {
					//先关闭页面
					that.closePage();
					//跳转到订单填写页
					var obj = {
						roomTypeInfo: that.roomTypeInfo, //房间信息
						globalData: that.globalData, //入住时间和退房时间
						beginDate: that.beginDate, //入住日期
						endDate: that.endDate //退房日期
					};
					uni.navigateTo({
						url: '../placeOrder/placeOrder?roomInfo=' + JSON.stringify(obj)
					});
				})
				.catch(res => {
					uni.navigateTo({
						url: '../login/login'
					});
				});
		},
		closePage() {
			this.$emit('closeRoom');
		},
		makingCall(phoneNumber) {
			uni.makePhoneCall({
				phoneNumber: phoneNumber
			});
		}
	}
};
</script>

<style lang="scss">
.masklayer {
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	z-index: -1;
}
.page {
	position: fixed;
	background-color: white;
	top: 326.08695upx;
	bottom: 0;
	width: 100%;
	z-index: 10;
	.roomTop {
		width: 100%;
		display: flex;
		height: 81.52173upx;
		padding: 18.11594upx;
		vertical-align: middle;
		align-items: center;
		z-index: 55;
		background-color: white;
		h2 {
			font-size: 32.60869upx;
			font-weight: 500;
			flex: 1;
		}
		image {
			width: 54.34782upx;
			height: 54.34782upx;
			position: relative;
			right: 36.23188upx;
		}
	}
	.roomPage {
		background-color: #f5f9fc;
		overflow: hidden;
		height: calc(100% - 210upx);
		background-color: white;
		.swiper-box {
			width: 100%;
			height: 498.1884upx;
		}
		.roominfo {
			padding: 18.11594upx;
			border-bottom: 1px solid #f5f9fc;
			.infoRow {
				display: flex;
				.info-left,
				.info-right {
					flex: 1;
					view {
						display: flex;
						span {
							color: #666666;
							margin-right: 36.23188upx;
						}
					}
				}
			}
			.infobottom {
				margin-top: 36.23188upx;
				display: flex;
				span {
					color: #666666;
					margin-right: 36.23188upx;
				}
			}
		}
		.sales {
			padding: 18.11594upx;
			border-bottom: 1px solid #f5f9fc;
			h2 {
				font-size: 36.23188upx;
				font-weight: bold;
			}
			.sales-item {
				display: flex;
				padding: 9.05797upx 0;
				vertical-align: middle;
				align-items: center;
				span {
					flex: 0.2;
					background-color: rgb(254, 246, 236);
					margin-right: 18.11594upx;
					text-align: center;
					font-size: 25.36231upx;
				}
				p {
					font-weight: 600;
					flex: 0.8;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				image {
					width: 32.60869upx;
					height: 32.60869upx;
					height: 600;
				}
			}
		}
		.description {
			padding: 18.11594upx;
			.des {
				h2 {
					font-size: 36.23188upx;
					font-weight: bold;
				}
				ul {
					padding-left: 36.23188upx;
				}
				ul > li {
					color: #999999;
				}
				ul > li::before {
					content: '';
					position: relative;
					bottom: -27.17391upx;
					left: -21.73913upx;
					display: block;

					width: 9.05797upx;
					height: 9.05797upx;
					border-radius: 9.05797upx;
					background-color: #999999;
				}
				ul > li > p {
					color: #333333;
				}
			}
		}
	}
}

.operation {
	width: 100%;
	height: 108.69565upx;
	display: flex;
	position: fixed;
	bottom: 0;
	vertical-align: middle;
	align-items: center;
}
.operation > .contactBtn {
	display: flex;
	vertical-align: middle;
	align-items: center;
	justify-content: center;
	flex: 0.25;
	border: none;
	height: 100%;
	line-height: 81.52173upx;
	justify-content: center;
	border-radius: inherit;
	background-color: white;
	font-size: 25.36231upx;
	font-weight: bold;
	background-color: #baa785;
	color: #333;
}

.operation > .contactBtn:after {
	border: none;
}

.operation > .reserveBtn {
	display: flex;
	vertical-align: middle;
	align-items: center;
	justify-content: center;
	flex: 0.5;
	height: 100%;
	line-height: 81.52173upx;
	border: none;
	background-color: white;
	border-radius: inherit;
	font-size: 28.9855upx;
	font-weight: bold;
	color: #000;
}
.operation > .reserveBtn > span:nth-child(1) {
	font-size: 45.28985upx;
}
.operation > .reserveBtn > span:nth-child(2) {
	font-size: 27.17391upx;
}
.operation > .reserveBtn:after {
	border: none;
}
</style>
