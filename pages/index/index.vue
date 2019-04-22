<template>
	<view class="roomReservation">
		<authorize v-if="isAuthorizeShow" @GetUserInfo="getUserInfo"></authorize>
		<view class="room-info">
			<view class="hotel-img">
				<image class="img-bg" src="../../static/images/room/20181214172004933808032.jpg" mode="widthFix"></image>
				<h2 class="info-title">香泉酒店</h2>
			</view>
			<view class="locationMsg">
				<view class="positionDetails">
					<view class="locationTitle">
						<p>珠海市香洲区香泉酒店</p>
						<button>
							<span>地图/周边</span>
							<image src="../../static/images/order/icon/youjiantou.png" mode="widthFix"></image>
						</button>
					</view>
					<view class="location-airport">
						<image src="../../static/images/room/icon_aircraft.png" mode="widthFix"></image>
						<p>距珠海金湾机场50.2公里，驾车约1小时5分钟</p>
					</view>
					<view class="location-train">
						<image src="../../static/images/room/icon_train.png" mode="widthFix"></image>
						<p>距珠海火车站9.7公里，驾车约26分钟</p>
					</view>
				</view>
				<view class="circum"><p>酒店位于香洲区凤凰北香埠路116号，坐拥香洲区繁华地带，毗邻尚都百货、香洲百货、扬名广场购中中心，周边美食丰盛。</p></view>
			</view>
			<view class="checkindate">
				<view class="search-item" @tap="selectDate">
					<!-- 入住 -->
					<view class="date-item" hover-class="hover-class">
						<text>{{ globalData.checkIn.month }}月{{ globalData.checkIn.day }}日</text>
						<view class="check-info">
							<view>周{{ globalData.checkIn.week }}</view>
							<view>入住</view>
						</view>
					</view>
					<!-- 入住天数 -->
					<view class="date-item">
						<view class="check-days">
							<image src="../../static/images/index/yue.png" class="check-moon"></image>
							<text>共{{ (globalData.checkOut.timeStamp - globalData.checkIn.timeStamp) / 86400000 }}晚</text>
						</view>
					</view>
					<!-- 离店 -->
					<view class="date-item" hover-class="hover-class">
						<text>{{ globalData.checkOut.month }}月{{ globalData.checkOut.day }}日</text>
						<view class="check-info">
							<view>周{{ globalData.checkOut.week }}</view>
							<view>离店</view>
						</view>
					</view>
				</view>
				<!-- <view>
					<p>入住</p>
					<p>{{globalData.checkOut.month}}月{{globalData.checkOut.day}}日</p>
				</view>
				<view class="cy"><text>{{(globalData.checkOut.timeStamp-globalData.checkIn.timeStamp)/86400000}}晚</text></view>
				<view>
					<p>离开</p>
					<p>{{globalData.checkIn.month}}月{{globalData.checkIn.day}}日</p>
				</view> -->
			</view>
			<view class="room-list" v-for="item in count" :key="item">
				<view class="room-cover" @click="gotoRoomInfo(item)">
					<image style="width:100%;height: 362.31884upx;" src="../../static/images/room/20181214172004933808032.jpg" mode="widthFix"></image>
					<view class="span">
						￥568.0
						<text>起</text>
					</view>
				</view>
				<view class="room-type">
					<view><h2>豪华套房</h2></view>
					<view><button @click="reservation()">预订房间</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import authorize from '@/components/authorize';
import utils from '@/utils/utils.js';
var app = getApp();
export default {
	components: {
		authorize
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
			globalData: {
				code: '',
				userInfo: null,
				today: '',
				checkIn: '',
				checkOut: ''
			},
			current: 0,
			mode: 'long',
			count: 10,
			type: '',
			msg: '大佬'
		};
	},
	onShow() {
		let that = this;
		that.globalData = app.$vm.globalData;
		console.log(this.globalData);
		utils
			.checkSession()
			.then(res => {
				// that.goLogin();
			})
			.catch(res => {
				that.isAuthorizeShow = true;
			});
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		gotoRoomInfo() {
			uni.navigateTo({
				url: '../roomDetails/roomDetails',
				animationType: 'fade-in',
				animationDuration: 1000
			});
		},
		selectDate() {
			uni.navigateTo({
				url: '../selectDate/selectDate?checkIn=' + JSON.stringify(this.globalData.checkIn) + '&checkOut=' + JSON.stringify(this.globalData.checkOut),
				animationType: 'fade-in',
				animationDuration: 1000
			});
		},
		// 获取个人信息
		getUserInfo(res) {
			console.log(res);
			this.globalData.userInfo = res.userInfo;

			api.authorize({
				appid: globalData.appid,
				code: globalData.code,
				encryptedData: res.encryptedData,
				iv: res.iv
			}).then(res => {
				console.log(res);
			});
		},
		reservation() {
			uni.navigateTo({
				url:'../placeOrder/placeOrder'
			})
		}
	}
};
</script>

<style lang="scss">
.hotel-img {
	position: relative;

	image {
		width: 100%;
	}

	.info-title {
		font-size: 36.23188upx;
		font-weight: 500;
		color: #ffffff;
		position: absolute;
		z-index: 99999;
		bottom: 18.11594upx;
		padding-left: 36.23188upx;
		background-color: transparent;
	}
}

.roomReservation {
	background-color: #f5f9fc;
	overflow: hidden;

	.room-info > .locationMsg,
	.room-list,
	.checkindate {
		background-color: #fff;
	}

	.room-info {
		.info-title {
			font-size: 36.23188upx;
			font-weight: 500;
			color: #ffffff;
			position: absolute;
			z-index: 1;
			top: 416.66666upx;
			padding-left: 36.23188upx;
			background-color: transparent;
		}

		.locationMsg {
			padding: 14.49275upx 14.49275upx 14.49275upx 28.9855upx;
			margin-bottom: 28.9855upx;

			.positionDetails {
				border-bottom: 1px solid #f7f9fb;
				padding: 9.05797upx 0;

				.locationTitle {
					display: flex;
					font-size: 28.9855upx;
					color: #333333;
					background-color: white;
					vertical-align: middle;
					align-items: center;

					p {
						flex: 0.7;
						padding: 9.05797upx 0;
					}

					button {
						flex: 0.3;
						font-size: 23.55072upx;
						color: #cda754;
						background-color: white;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						&:after {
							border: none;
						}

						image {
							width: 28.9855upx;
							height: 28.9855upx;
						}
					}
				}

				.location-airport,
				.location-train {
					display: flex;
					vertical-align: middle;
					align-items: center;
					color: #8e9093;
					font-size: 25.36231upx;

					image {
						width: 28.9855upx;
						height: 28.9855upx;
					}
				}

				.circum {
					padding: 14.49275upx;
					line-height: normal;
					font-size: 25.36231upx;
					color: #8e9093;
					background-color: #f4f4f4;
				}
			}
		}
	}

	// 		.checkindate {
	// 			display: flex;
	// 			padding: 28.9855upx 0;
	//
	// 			.cy {
	// 				text {
	// 					border: 0.55px solid #eee;
	// 					font-size: 25.36231upx;
	// 					border-radius: 3px;
	// 					padding: 9.05797upx;
	// 				}
	// 			}
	//
	// 			view {
	// 				flex: 1;
	// 				text-align: center;
	// 				line-height: 50upx;
	// 				display: box;
	// 				box-pack: center;
	// 				box-orient: vertical;
	// 				display: -webkit-box;
	// 				-webkit-box-pack: center;
	// 				-webkit-box-orient: vertical;
	// 				color: #666666;
	//
	// 				p:nth-child(1) {
	// 					font-size: 25.36231upx;
	// 				}
	//
	// 				p:nth-child(2) {
	// 					font-size: 28.9855upx;
	// 					font-weight: bold;
	// 				}
	// 			}
	// 		}

	.room-list {
		.room-cover {
			position: relative;

			.span {
				position: absolute;
				bottom: 16upx;
				z-index: 1;
				left: 0;
				padding: 0 10.86956upx;
				background: rgba(0, 0, 0, 0.75);
				color: #fff;
				font-size: 36.23188upx;

				text {
					font-size: 27.17391upx;
					margin-left: 9.05797upx;
				}
			}
		}

		.room-type {
			display: flex;
			width: 100%;
			padding-left: 28.9855upx;
			padding-bottom: 28.9855upx;
			vertical-align: middle;
			align-items: center;

			view:nth-child(1) {
				flex: 0.7;
				justify-content: center;

				h2 {
					font-size: 36.23188upx;
					font-weight: 500;
					padding: 9.05797upx 0;
				}

				span {
					padding: 3px 5px;
					border: 1px solid #cda754;
					font-size: 12px;
					margin-right: 5px;
					border-radius: 3px;
					color: #cda754;
				}
			}

			view:nth-child(2) {
				flex: 0.3;
				justify-content: center;

				button {
					width: 126.81159upx;
					height: 54.34782upx;
					font-size: 23.55072upx;
					background: -webkit-gradient(linear, left top, left bottom, from(#cda754), to(#e5c893)) !important;
					background: linear-gradient(to bottom, #cda754, #e5c893) !important;
					padding: 0;
					line-height: 54.34782upx;
					color: white;
				}
			}
		}
	}
}
.search-item {
	font-size: 28rpx;
	color: #333;
	height: 94rpx;
	line-height: 90rpx;
	display: flex;
	justify-content: space-between;
	padding: 18.11594upx 36.23188upx;
	/* 入住天数 */

	.date-item {
		width: 170rpx;
		line-height: inherit;
	}

	.date-item:nth-child(2) {
		width: 160rpx;
	}

	.check-info {
		line-height: inherit !important;
		color: #999;
		font-size: 22rpx;
		float: right;
		margin-top: 14rpx;
		view {
			line-height: initial !important;
			font-size: 22rpx;
		}
	}

	.check-days {
		border-bottom: 1px solid #cda754;
		height: 64rpx;
		line-height: 70rpx;
		color: #cda754;
		text-align: center;
		display: inline-block;
		vertical-align: text-bottom;
		width: 100%;
	}

	.check-moon {
		width: 36.23188upx;
		height: 41.66666upx;
		margin-right: 10rpx;
		display: inline-block;
		vertical-align: text-bottom;
	}

	.search-ipt {
		width: 100%;
		height: 100%;
	}

	.search-ipt:-moz-placeholder {
		color: #999;
	}
}
</style>
