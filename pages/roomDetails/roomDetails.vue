<template>
	<view class="page">
		<view class="roomTop">
			<h2>标准双床房[人气精选预付价]</h2>
			<image src="../../static/images/room/error.png" mode=""></image>
		</view>
		<view class="roomPage">
			<uniSwiperDot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in info" :key="index" style="width: 100%;height: 100%;">
						<view class="swiper-item" style="width: 100%;height: 100%;">
							<image style="width: 100%;height: 100%;" :src="item.imgurl" mode="" class="swiper-item-img"></image>
						</view>
					</swiper-item>
				</swiper>
			</uniSwiperDot>
			<view class="roominfo">
				<view class="infoRow">
					<view class="info-left">
						<view>
							<span>面积:</span>
							<p>20㎡</p>
						</view>
						<view>
							<span>楼层:</span>
							<p>13-28层</p>
						</view>
						<view>
							<span>可住:</span>
							<p>2人</p>
						</view>
						<view>
							<span>卫浴:</span>
							<p>独立卫浴</p>
						</view>
					</view>
					<view class="info-right">
						<view>
							<span>早餐:</span>
							<p>无早餐</p>
						</view>
						<view>
							<span>窗户:</span>
							<p>有窗</p>
						</view>
						<view>
							<span>宽带:</span>
							<p>免费WiFi和宽带</p>
						</view>
						<view>
							<span>空调:</span>
							<p>有空调</p>
						</view>
					</view>
				</view>
				<view class="infobottom">
					<span>浴室配套:</span>
					<p>24小时热水、洗漱用具</p>
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
						<li><p>订单确定后不可取消/变更，如未入住，酒店将扣除全额房费</p></li>
					</ul>
				</view>
				<view class="des">
					<h2>预定说明</h2>
					<ul>
						<li><p>15分钟内确认订单</p></li>
						<li><p>发票由代理商开具，如需发票，请在下单时填写发票信息</p></li>
					</ul>
				</view>
				<view class="des">
					<h2>使用规则</h2>
					<ul>
						<li><p>直接消费，无需美团劵，携带所有入住人的有效身份证办理入住，入住必须按照一人一证</p></li>
						<li><p>请在14：00之后入住并于次日13：00之前退房；如需提前入住或延时退房，请咨询商家</p></li>
						<li><p>入住需要押金，金额以前台为准</p></li>
					</ul>
				</view>
			</view>
		</view>
		<view class="operation">
			<button class="contactBtn">联系客服</button>
			<button class="reserveBtn" @click="gotoPrice()">预订</button>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '../../components/uni-swiper-dot/uni-swiper-dot.vue';
export default {
	components: {
		uniSwiperDot
	},
	data() {
		return {
			info: [
				{
					imgurl: '../../static/images/room/20181214161550000808031.jpg'
				},
				{
					imgurl: '../../static/images/room/20181214172226515808034.jpg'
				},
				{
					imgurl: '../../static/images/room/20181214175519996808036.jpg'
				}
			],
			current: 0,
			mode: 'long'
		};
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		gotoPrice(){
			uni.navigateTo({
				url:'../placeOrder/placeOrder'
			})
		}
	}
};
</script>

<style lang="scss">
.page {
	.roomTop {
		position: fixed;
		top: 0;
		width: 100%;
		display: flex;
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
		margin-top: 81.52173upx;
		margin-bottom: 81.52173upx;
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
				ul > li::before{
					content:"";
					position: relative;
					bottom: -27.17391upx;
					left: -21.73913upx;
					display:block;
					
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
	height: 81.52173upx;
	display: flex;
	position: fixed;
	bottom: 0;
	vertical-align: middle;
	align-items: center;
}
.operation > .contactBtn {
	flex: 0.3;
	border: none;
	height: 100%;
	line-height: 81.52173upx;
	justify-content: center;
	border-radius: inherit;
	background-color: white;
	font-size: 25.36231upx;
	font-weight: bold;
	color: #cda754;
}

.operation > .contactBtn:after {
	border: none;
}

.operation > .reserveBtn {
	flex: 0.7;
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
.operation > .reserveBtn:after {
	border: none;
}
</style>
