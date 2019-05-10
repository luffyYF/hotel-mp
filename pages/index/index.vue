<template>
	<view class="roomReservation" v-cloak>
		<view class="room-info">
			<view class="hotel-img">
				<image class="img-bg" :src="IMGURL + companyInfo.image" mode="aspectFit"></image>
				<h2 class="info-title">
					<view class="title">{{ companyInfo.name }}</view>
					<view class="imgCount">
						<image src="../../static/images/index/photo.png" mode=""></image>
						<span>16张</span>
					</view>
				</h2>
				<view class="evaluate" @tap="gotoComment">
					<span class="b">4.3分</span>
					<span class="c">1279评论&gt;</span>
				</view>
			</view>
			<view class="locationMsg">
				<view class="positionDetails">
					<view class="locationTitle" @tap="gotoMap">
						<p>{{ companyInfo.name }}</p>
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
				<view class="circum">
					<p>酒店位于 :&nbsp;{{ companyInfo.address }}</p>
				</view>
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
			<view class="room-list" v-for="(item, index) in roomTypeList" :key="index">
				<view class="room-cover" @tap="gotoRoomInfo(item.roomTypePk)">
					<image style="width:100%;height: 362.31884upx;" :src="IMGURL + item.coverImage" mode="aspectFill"></image>
					<view class="span">
						<span>￥{{ item.disPrice }}</span>
						<span class="original">￥{{ item.price }}</span>
					</view>
				</view>
				<view class="room-type">
					<view>
						<h2>{{ item.typeName }}</h2>
					</view>
					<view>
						<button @tap="reservation(item)" style="border: none;" :disabled="item.isFull == 'Y' ? true : false">{{ item.isFull == 'Y' ? '今日已满' : '预定房间' }}</button>
					</view>
				</view>
			</view>
		</view>
		<roomDetails v-if="isRoomDetails" :roomData="roomData" @closeRoom="closeRoom"></roomDetails>
	</view>
</template>

<script>
import roomDetails from '@/components/roomDetails/roomDetails';
import utils from '@/utils/util';
import api from '@/utils/api';
import allocation from '@/utils/config.js';
import user from '@/services/user.js';
var app = getApp();
export default {
	components: {
		roomDetails
	},
	data() {
		return {
			isRoomDetails: false,
			roomTypeList: [],
			companyInfo: {},
			IMGURL: '',
			globalData: {
				code: '',
				userInfo: null,
				today: '',
				checkIn: '',
				checkOut: ''
			},
			roomData: {},
			beginDate: '',
			endDate: '',
			userInfo: {}
		};
	},

	onShow: function(e) {
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		let that = this;
		that.globalData = app.$vm.globalData;
		/* console.log(that.globalData); */
		//转换日期格式
		that.convdate();
		//把图片路径中的“\”改为“/”
		/* res.data[i].rentCoverImg = that.IMGURL+res.data[i].rentCoverImg.replace(/\\/g, '/'); */

		user.isUserinfo()
			.then(res => {
				user.getUserInfo().then(res => {
					/* console.log(res); */
					api.getHome({
						gradePk: res.gradePk,
						companyPk: '2583636c-71cd-4d7a-afa3-dce10b6b0e55',
						beginDate: that.beginDate,
						endDate: that.endDate,
						userPk:res.memPk
					}).then(res => {
						if (res.code == 1) {
							that.roomTypeList = res.data.roomTypeList;
							that.companyInfo = res.data.companyInfo;
							that.IMGURL = api.config.IMGURL;
							/* res.data.companyInfo.image = that.IMGURL + res.data.companyInfo.image.replace(/\\/g, '/'); */
						}
					});
				});
			})
			.catch(res => {
				console.log(res);
				api.getHome({
					gradePk: '',
					companyPk: '2583636c-71cd-4d7a-afa3-dce10b6b0e55',
					beginDate: that.beginDate,
					endDate: that.endDate
				}).then(res => {
					if (res.code == 1) {
						that.roomTypeList = res.data.roomTypeList;
						that.companyInfo = res.data.companyInfo;
						that.IMGURL = api.config.IMGURL;
						/* res.data.companyInfo.image = that.IMGURL + res.data.companyInfo.image.replace(/\\/g, '/'); */
					}
				});
			});
	},
	methods: {
		//跳转到房间详情页
		gotoRoomInfo(roomTypePk) {
			let that = this;
			user.isUserinfo()
				.then(res => {
					user.getUserInfo().then(res => {
						/* console.log(res); */
						api.getRoomType({
							gradePk: res.gradePk, //会员级别
							companyPk: allocation.COMPANYPK, //酒店主键
							roomTypePk: roomTypePk, //房型主键
							beginDate: that.beginDate, //开始日期
							endDate: that.endDate //结束日期
						}).then(res => {
							if (res.code == 1) {
								wx.hideTabBar();
								that.isRoomDetails = true;
								that.roomData = res;
								that.roomData.globalData = that.globalData;
								that.roomData.beginDate = that.beginDate;
								that.roomData.endDate = that.endDate;
							}
						});
					});
				})
				.catch(res => {
					console.log(res);
					api.getRoomType({
						gradePk: '', //会员级别
						companyPk: allocation.COMPANYPK, //酒店主键
						roomTypePk: roomTypePk, //房型主键
						beginDate: that.beginDate, //开始日期
						endDate: that.endDate //结束日期
					}).then(res => {
						if (res.code == 1) {
							wx.hideTabBar();
							that.isRoomDetails = true;
							that.roomData = res;
							that.roomData.globalData = that.globalData;
							that.roomData.beginDate = that.beginDate;
							that.roomData.endDate = that.endDate;
						}
					});
				});
		},
		//关闭房间详情页
		closeRoom() {
			this.isRoomDetails = false;
			wx.showTabBar();
		},
		//跳转到评论页
		gotoComment() {
			uni.navigateTo({
				url: '../comment/comment'
			});
		},
		//选择日期
		selectDate() {
			uni.navigateTo({
				url: '../selectDate/selectDate?checkIn=' + JSON.stringify(this.globalData.checkIn) + '&checkOut=' + JSON.stringify(this.globalData.checkOut),
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		convdate() {
			let that = this;
			//将日期转换为2019-04-25这种格式
			if (typeof that.globalData.checkOut.month != 'string') {
				if (that.globalData.checkOut.month < 10) {
					that.globalData.checkOut.month = '0' + that.globalData.checkOut.month;
				}
			}
			if (typeof that.globalData.checkOut.day != 'string') {
				if (that.globalData.checkOut.day < 10) {
					that.globalData.checkOut.day = '0' + that.globalData.checkOut.day;
				}
			}
			if (typeof that.globalData.checkIn.month != 'string') {
				if (that.globalData.checkIn.month < 10) {
					that.globalData.checkIn.month = '0' + that.globalData.checkIn.month;
				}
			}
			if (typeof that.globalData.checkIn.day != 'string') {
				if (that.globalData.checkIn.day < 10) {
					that.globalData.checkIn.day = '0' + that.globalData.checkIn.day;
				}
			}
			that.beginDate = that.globalData.checkIn.year + '-' + that.globalData.checkIn.month + '-' + that.globalData.checkIn.day;
			that.endDate = that.globalData.checkOut.year + '-' + that.globalData.checkOut.month + '-' + that.globalData.checkOut.day;
		},
		//跳转到订单填写页
		reservation(item) {
			let that = this;
			user.isUserinfo()
				.then(res => {
					user.getUserInfo().then(res => {
						api.getRoomType({
							gradePk: res.gradePk, //会员级别
							companyPk: allocation.COMPANYPK, //酒店主键
							roomTypePk: item.roomTypePk, //房型主键
							beginDate: that.beginDate, //开始日期
							endDate: that.endDate //结束日期
						}).then(res => {
							if (res.code == 1) {
								var obj = {
									roomTypeInfo: res.data.roomTypeInfo, //房间信息
									globalData: that.globalData, //入住时间和退房时间
									beginDate: that.beginDate, //入住日期
									endDate: that.endDate //退房日期
								};

								uni.navigateTo({
									url: '../placeOrder/placeOrder?roomInfo=' + JSON.stringify(obj)
								});
							}
						});
					});
				})
				.catch(res => {
					uni.navigateTo({
						url: '../login/login'
					});
				});
		},
		//跳到地图详情页
		gotoMap(){
			var obj={
				latitude:this.companyInfo.latitude,
				longitude: this.companyInfo.longitude,
				title:this.companyInfo.name
			}
			uni.navigateTo({
				url:'../map/map?mapInfo='+JSON.stringify(obj)
			})
		}
	}
};
</script>

<style lang="scss">
[v-cloak] {
	display: none !important;
}
.hotel-img {
	position: relative;

	image {
		width: 100%;
	}

	.evaluate {
		padding: 0 9.05797upx;
		position: absolute;
		right: 36.23188upx;
		top: 172.10144upx;
		width: 126.81159upx;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 18.11594upx;

		.b {
			color: #e5c893;
			font-size: 32.60869upx;
			font-weight: 600;
			padding: 9.05797upx 0;
			display: block;
			text-align: center;
			border-bottom: 0.90579upx solid #8e9093;
		}
		.c {
			font-size: 21.73913upx;
			padding: 9.05797upx 0;
			display: block;
			text-align: center;
			color: #e5c893;
		}
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
			width: 100%;
			font-weight: 500;
			color: #ffffff;
			position: absolute;
			z-index: 2;
			bottom: 27.17391upx;
			background-color: transparent;
			display: flex;
			.title {
				flex: 1;
				font-size: 36.23188upx;
				justify-content: flex-start;
				margin-left: 54.34782upx;
			}
			.imgCount {
				margin-right: 50.72463upx;
				padding: 0 9.05797upx;
				color: white;
				background: rgba(0, 0, 0, 0.6);
				border-radius: 9.05797upx;
			}
			view {
				display: flex;
				vertical-align: middle;
				align-items: center;
				justify-content: flex-end;
				image {
					width: 45.28985upx;
					height: 45.28985upx;
				}
			}
		}
		.locationMsg {
			padding: 14.49275upx 14.49275upx 14.49275upx 28.9855upx;
			margin-bottom: 28.9855upx;
			clear: both;
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
				.original {
					font-size: 21.73913upx;
					text-decoration: line-through;
					color: #ccc;
				}
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
					width:144.92753upx;
					height: 52upx;
					font-size: 23.55072upx;
					background-color: #e0c475;
					border-radius: 90.57971upx;
					padding: 0;
					line-height: 52upx;
					color: #fff;
				}
				button::after{ border: none;}
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
