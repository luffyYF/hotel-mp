<template>
	<view class="roomReservation">
		<!-- 		<headnav ref="headnav"></headnav> -->
		<view class="room-info">
			<uniSwiperDot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in info" :key="index" style="width: 100%;height: 100%;">
						<view class="swiper-item" style="width: 100%;height: 100%;">
							<image style="width: 100%;height: 100%;" :src="item.imgurl" mode="" class="swiper-item-img"></image>
						</view>
					</swiper-item>
				</swiper>
			</uniSwiperDot>
			<h2 class="info-title">香泉酒店</h2>
			<view class="locationMsg">
				<view class="positionDetails">
					<view class="locationTitle">
						<p>珠海市香洲区香泉酒店</p>
						<button>
							<span>地图/周边</span>
							<image src="../../static/images/order/icon/youjiantou.png" mode="aspectFill"></image>
						</button>
					</view>
					<view class="location-airport">
						<image src="../../static/images/room/icon_aircraft.png" mode=""></image>
						<p>距珠海金湾机场50.2公里，驾车约1小时5分钟</p>
					</view>
					<view class="location-train">
						<image src="../../static/images/room/icon_train.png" mode=""></image>
						<p>距珠海火车站9.7公里，驾车约26分钟</p>
					</view>
				</view>
				<view class="circum"><p>酒店位于香洲区凤凰北香埠路116号，坐拥香洲区繁华地带，毗邻尚都百货、香洲百货、扬名广场购中中心，周边美食丰盛。</p></view>
			</view>
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
			<view class="room-list" v-for="item in count" :key="item" @click="gotoDetails()">
				<view class="room-cover">
					<image style="width:100%;height: 362.31884upx;" src="../../static/images/room/20181214172004933808032.jpg" mode="scaleToFill"></image>
					<span>
						<span>￥</span>
						<span>568.0</span>
						<span>起</span>
					</span>
				</view>
				<view class="room-type">
					<view>
						<h2>豪华套房</h2>
						<span>连住优惠</span>
						<span>早预定优惠</span>
						<span>位于市中心</span>
					</view>
					<view><button @click="gotoPrice">房间预订</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '../../components/uni-swiper-dot/uni-swiper-dot.vue';
import headnav from '../../components/headnav/headnav.vue';
export default {
	components: {
		uniSwiperDot,
		headnav
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
			mode: 'long',
			count: 10
		};
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		gotoDetails() {
			uni.navigateTo({
				url: 'roomDetails',
				animationType:'fade-in',
				animationDuration: 1000
			});
		},
		gotoPrice() {
			uni.navigateTo({
				url: 'selectPrice',
				animationType:'fade-in',
				animationDuration: 1000
			});
		}
	}
};
</script>

<style>
.roomReservation {
	background-color: #f5f9fc;
	overflow: hidden;
}
.roomReservation .room-info > .locationMsg,
.roomReservation .room-list,
.roomReservation .checkindate {
	background-color: #fff;
}
.room-info .swiper-box {
	width: 100%;
	height: 498.1884upx;
}
.room-info .info-title {
	font-size: 36.23188upx;
	font-weight: 500;
	color: #ffffff;
	position: absolute;
	z-index: 99999;
	top: 416.66666upx;
	padding-left: 36.23188upx;
	background-color: transparent;
}
.roomReservation .room-info .locationMsg .positionDetails .locationTitle {
	display: flex;
	font-size: 28.9855upx;
	color: #333333;
	background-color: white;
	vertical-align: middle;
	align-items: center;
}
.roomReservation .room-info .locationMsg .positionDetails .locationTitle > p {
	flex: 0.7;
	padding: 9.05797upx 0;
}
.roomReservation .room-info .locationMsg .positionDetails .locationTitle > button {
	flex: 0.3;
	font-size: 23.55072upx;
	color: #cda754;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.roomReservation .room-info .locationMsg .positionDetails .locationTitle > button:after {
	border: none;
}
.roomReservation .room-info .locationMsg .positionDetails .locationTitle > button > image {
	width: 28.9855upx;
	height: 28.9855upx;
}
.roomReservation .room-info .locationMsg {
	padding: 14.49275upx 14.49275upx 14.49275upx 28.9855upx;
	margin-bottom: 28.9855upx;
}
.roomReservation .room-info .locationMsg .positionDetails .location-airport > image,
.roomReservation .room-info .locationMsg .positionDetails .location-train > image {
	width: 28.9855upx;
	height: 28.9855upx;
}
.roomReservation .room-info .locationMsg .positionDetails .location-airport,
.roomReservation .room-info .locationMsg .positionDetails .location-train {
	display: flex;
	vertical-align: middle;
	align-items: center;
	color: #8e9093;
	font-size: 25.36231upx;
}
.roomReservation .room-info .locationMsg .positionDetails {
	border-bottom: 1px solid #f7f9fb;
	padding: 9.05797upx 0;
}
.roomReservation .room-info .locationMsg .circum {
	padding: 14.49275upx;
	line-height: normal;
	font-size: 25.36231upx;
	color: #8e9093;
	background-color: #f4f4f4;
}
.roomReservation .checkindate {
	display: flex;
	padding: 28.9855upx 0;
}
.roomReservation .checkindate .cy text {
	border: 0.55px solid #eee;
	border-radius: 3px;
	padding: 9.05797upx;
}
.roomReservation .checkindate view {
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
.roomReservation .checkindate view > p:nth-child(1) {
	font-size: 25.36231upx;
}
.roomReservation .checkindate view > p:nth-child(2) {
	font-size: 28.9855upx;
	font-weight: 600;
}
.roomReservation .room-list .room-cover {
	position: relative;
}

.roomReservation .room-list .room-cover > span {
	position: absolute;
	bottom: 14.49275upx;
	z-index: 999999;
	float: left;
	left: 0;
	padding: 0 10.86956upx;
	background: rgba(0, 0, 0, 0.75);
	color: #fff;
	font-size: 27.17391upx;
}
.roomReservation .room-list .room-cover > span > span:nth-child(2) {
	font-size: 36.23188upx;
}
.roomReservation .room-list .room-type {
	display: flex;
	width: 100%;
	padding-left: 28.9855upx;
	padding-bottom: 28.9855upx;
	vertical-align: middle;
	align-items: center;
}
.roomReservation .room-list .room-type > view:nth-child(1) {
	flex: 0.7;
	justify-content: center;
}
.roomReservation .room-list .room-type > view:nth-child(2) {
	flex: 0.3;
	justify-content: center;
}
.roomReservation .room-list .room-type > view:nth-child(1) > h2 {
	font-size: 36.23188upx;
	font-weight: 500;
	padding: 9.05797upx 0;
}
.roomReservation .room-list .room-type > view:nth-child(1) > span {
	padding: 3px 5px;
	border: 1px solid #cda754;
	font-size: 12px;
	margin-right: 5px;
	border-radius: 3px;
	color: #cda754;
}
.roomReservation .room-list .room-type > view:nth-child(2) > button {
	width: 126.81159upx;
	height: 54.34782upx;
	font-size: 23.55072upx;
	background: -webkit-gradient(linear, left top, left bottom, from(#cda754), to(#e5c893)) !important;
	background: linear-gradient(to bottom, #cda754, #e5c893) !important;
	padding: 0;
	line-height: 54.34782upx;
	color: white;
}
</style>
