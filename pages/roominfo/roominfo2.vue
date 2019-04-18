<template>
	<view class="page">
		<view class="roomTop">
			<h2>温馨浪漫房</h2>
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
			<span class="item-price">
				<span>
					<span>¥</span>
					<span>548</span>
					<span>/晚</span>
				</span>
			</span>
			<view class="roominfo">
				<view class="roomTitle">
					<h2>温馨浪漫房</h2>
					<view class="">
						<span>连住优惠</span>
						<span>早预定优惠</span>
						<span>位于市中心</span>
						<span>交通便捷</span>
						<span>海景</span>
						<span>网络畅通</span>
					</view>
				</view>
				<view class="roomfullname">
					<image src="../../static/images/home/yue.png" mode=""></image>
					<h2>豪斯菲尔公寓(格力香樟店)</h2>
				</view>
				<view class="roomsize">
					<view class="">
						<image src="../../static/images/room/hx.png" mode=""></image>
						<span>1室1厅1卫1厨</span>
						<p>48㎡</p>
						<p>可做饭（付费）</p>
					</view>
					<view class="">
						<image src="../../static/images/room/hx.png" mode=""></image>
						<span>宜住2人1床</span>
						<p>1.5米双人床</p>
						<p>不可加床</p>
					</view>
				</view>
			</view>
			<view class="evaluate">
				<view class="evaluate-title">
					<view>
						<span>5</span>
						<span>超赞</span>
					</view>
					<view>
						<span>6</span>
						<span>条评论</span>
						<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
				</view>
				<view class="evaluate-info">
					<view>
						<image src="../../static/images/room/2018050104415703180921.jpg" mode=""></image>
						<view>
							<span>JieHao•Wang</span>
							<p>2019-01-26</p>
						</view>
					</view>
					<view>
						<image src="../../static/images/room/star.png" mode=""></image>
						<image src="../../static/images/room/star.png" mode=""></image>
						<image src="../../static/images/room/star.png" mode=""></image>
						<image src="../../static/images/room/star.png" mode=""></image>
						<image src="../../static/images/room/star.png" mode=""></image>
					</view>
				</view>
				<view class="evaluate-content"><p>环境卫生都比七天城市客栈好，而且便宜，能做到很不错了！！！</p></view>
			</view>

			<view class="housing">
				<h2>房屋信息</h2>
				<view class="housing-content">
					<p>
						酒店位于香洲区凤凰北香埠路116号，坐拥香洲区繁华地带，毗邻尚都百货、香洲百货、扬名广场购中中心，周边美食丰盛。
						<br />
						漫步休闲至情侣中路上只需3分钟遥望日月贝，野猩岛，车程3分种即可上岛游玩观光。
					</p>
					<view class="lookall">
						<span>展开全部</span>
						<image class="icon-down" src="../../static/images/room/down.png" mode=""></image>
					</view>
				</view>
				<view class="housing-map"><image src="../../static/images/home/ad_pic1.png" mode=""></image></view>
			</view>
			<view class="configuration">
				<h2>配置信息</h2>
				<view class="configuration-items" :class="showConfig ? 'item-height' : ''">
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
					<view class="configuration-item">
						<image src="../../static/images/room/20170315200120274808045.png" mode=""></image>
						<p>电梯</p>
					</view>
				</view>
				<view class="lookall" @click="showitems">
					<span>展开全部</span>
					<image class="icon-down" src="../../static/images/room/down.png" mode=""></image>
				</view>
			</view>
			<view class="roomNotes">
				<h2>入住须知</h2>
				<view>
					<text>入住时间：</text>
					<text>14：00以后</text>
				</view>
				<view>
					<text>退房时间：</text>
					<text>12：00以前</text>
				</view>
				<view>
					<text>接待时间：</text>
					<text>14：00~12：59</text>
				</view>
				<view>
					<text>入住押金：</text>
					<text>￥4</text>
				</view>
				<view>
					<text>提供发票：</text>
					<text>可提供</text>
				</view>
			</view>
		</view>
		<view class="operation">
			<button class="contactBtn">联系客服</button>
			<button class="reserveBtn" @click="gotoPrice()">房间预订</button>
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
			mode: 'long',
			showConfig: false
		};
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		gotoPrice() {
			uni.navigateTo({
				url: '../payment/payment'
			});
		},
		showitems() {
			this.showConfig = !this.showConfig;
		}
	}
};
</script>

<style>
.page .roomTop {
	display: flex;
	padding: 18.11594upx;
	vertical-align: middle;
	align-items: center;
}
.page .roomTop h2 {
	font-size: 28.9855upx;
	font-weight: 500;
	flex: 1;
}
.page .roomTop image {
	width: 36.23188upx;
	height: 36.23188upx;
}
.roomPage {
	background-color: #f5f9fc;
	overflow: hidden;
	margin-bottom: 81.52173upx;
}

.roomPage > view {
	background-color: #fff;
}
.roomPage .swiper-box {
	width: 100%;
	height: 498.1884upx;
}

.roomPage > .item-price {
	float: left;
	position: relative;
	top: -90.57971upx;
	left: 12px;
	z-index: 1;
	border-width: 0;
	color: #fff;
	padding-bottom: 6px;
	font-family: -apple-system, 'Helvetica Neue', Roboto, sans-serif;
	font-weight: bold;
}
.roomPage > .item-price > span {
	padding: 8px 12px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.7);
	font-size: 32.60869upx;
	margin-bottom: 6px;
}
.roomPage > .item-price > span > span:nth-child(2) {
	font-size: 32.60869upx;
	margin: 0 5.43478upx;
}
.roomPage > .item-price > span > span:nth-child(1),
.roomPage > .item-price > span > span:nth-child(3) {
	font-size: 21.73913upx;
	margin: 0 5.43478upx;
}
.roomPage > .roominfo {
	padding-bottom: 18.11594upx;
	margin-bottom: 28.9855upx;
}
.roomPage > .roominfo > view {
	padding: 0 28.9855upx;
}
.roomPage > .roominfo .roomTitle {
	padding: 18.11594upx 28.9855upx;
	margin-top: 25.36231upx;
}
.roomPage > .roominfo .roomTitle > h2 {
	font-size: 32.60869upx;
	font-weight: 400;
	    clear: both;
}
.roomPage > .roominfo .roomTitle > view {
	font-size: 21.73913upx;
	margin-top: 28.9855upx;
}
.roomPage > .roominfo .roomTitle > view > span {
	padding-right: 7.24637upx;
}
.roomPage > .roominfo .roomTitle > view > span:nth-child(1) {
	color: #cda754;
}
.roomPage > .roominfo .roomfullname {
	height: 94.20289upx;
	display: flex;
	vertical-align: center;
	align-items: center;
	border-bottom: 1px solid #f7f9fb;
}
.roomPage > .roominfo .roomfullname > image {
	width: 43.47826upx;
	height: 43.47826upx;
	border-radius: 12px;
	margin-right: 36.23188upx;
}
.roomPage > .roominfo .roomfullname > h2 {
	font-size: 28.9855upx;
	font-weight: 400;
}
.roomPage > .roominfo .roomsize {
	display: flex;
	margin: 18.11594upx 0;
}
.roomPage > .roominfo .roomsize > view {
	flex: 1;
	text-align: center;
}
.roomPage > .roominfo .roomsize > view > image {
	display: block;
	margin: auto;
	width: 90.57971upx;
	height: 90.57971upx;
}
.roomPage > .roominfo .roomsize > view > span {
	display: block;
	color: #cda754;
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 4px;
}
.roomPage > .roominfo .roomsize > view > p {
	color: #666;
	font-size: 23.55072upx;
}
.roomPage > .evaluate {
	padding: 0 28.9855upx;
	margin-bottom: 28.9855upx;
}
.roomPage > .evaluate > .evaluate-title {
	display: flex;
	border-bottom: 1px solid #f7f9fb;
}
.roomPage > .evaluate > .evaluate-title > view {
	flex: 1;
	display: flex;
	vertical-align: middle;
	align-items: center;
	line-height: 72.46376upx;
	margin: 19.92753upx 0;
}
.roomPage > .evaluate > .evaluate-title > view > span {
	display: inline-block;
	height: 72.46376upx;
	line-height: 72.46376upx;
}
.roomPage > .evaluate > .evaluate-title > view:nth-child(1) > span:nth-child(1) {
	color: #cda754;
	font-size: 54.34782upx;
	margin-right: 9.05797upx;
}
.roomPage > .evaluate > .evaluate-title > view:nth-child(2) {
	justify-content: flex-end;
}
.roomPage > .evaluate > .evaluate-title > view:nth-child(2) > span:nth-child(1) {
	color: #cda754;
	margin: 0 9.05797upx;
}
.roomPage > .evaluate > .evaluate-title > view > image {
	display: inline-block;
	width: 39.85507upx;
	height: 39.85507upx;
}
.roomPage > .evaluate > .evaluate-info {
	display: flex;
	padding: 19.92753upx 0;
}
.roomPage > .evaluate > .evaluate-info > view {
	flex: 1;
	display: flex;
	vertical-align: middle;
	align-items: center;
	line-height: none;
}
.roomPage > .evaluate > .evaluate-info > view:nth-child(1) > image {
	display: block;
	border-radius: 32.60869upx;
	margin-right: 28.9855upx;
	width: 65.21739upx;
	height: 65.21739upx;
}
.roomPage > .evaluate > .evaluate-info > view:nth-child(1) > view > span,
.roomPage > .evaluate > .evaluate-info > view:nth-child(1) > view > p {
	font-size: 25.36231upx;
	line-height: 18.11594upx;
}
.roomPage > .evaluate > .evaluate-info > view:nth-child(1) > view > p {
	color: #8e9093;
}
.roomPage > .evaluate > .evaluate-info > view:nth-child(2) > image {
	width: 25.36231upx;
	height: 25.36231upx;
}
.roomPage > .evaluate > .evaluate-info > view:nth-child(2) {
	justify-content: flex-end;
}

.roomPage > .evaluate > .evaluate-content > p {
	color: #666;
	font-size: 25.36231upx;
	line-height: normal;
}
.roomPage > .evaluate > .evaluate-content {
	padding: 18.11594upx 0;
}
.roomPage > .optionDate {
	margin-bottom: 28.9855upx;
}
.roomPage > .housing,
.roomPage > .configuration,
.roomPage > .roomNotes {
	padding: 18.11594upx 28.9855upx;
	margin-bottom: 28.9855upx;
}
.roomPage > .housing > h2,
.roomPage > .configuration > h2,
.roomPage > .roomNotes > h2 {
	font-size: 36.23188upx;
	font-weight: 500;
	line-height: 90.57971upx;
}
.roomPage > .housing > .housing-content > p {
	height: 181.15942upx;
	/* 	height: auto; */
	text-overflow: inherit;
	font-size: 25.36231upx;
	color: #8e9093;
	line-height: 43.47826upx;
	overflow: hidden;
}
.roomPage > .housing > .housing-content > .lookall {
	text-align: center;
	padding: 21.73913upx 0;
}

.roomPage > .housing > .housing-content > view .icon-down {
	width: 23.55072upx;
	height: 23.55072upx;
}
.roomPage > .housing > .housing-map {
	padding: 18.11594upx 0;
}
.roomPage > .housing > .housing-map > image {
	width: 100%;
	height: 180px;
}
.roomPage > .configuration > .configuration-items {
	width: 100%;
	height: 81.52173upx;
	overflow: hidden;
	padding: 18.11594upx 0;
	display: flex;
	flex-wrap: wrap;
	align-self: flex-start;
}
.roomPage > .configuration > .item-height {
	height: auto;
}
.roomPage > .configuration > .configuration-items > .configuration-item {
	width: 20%;
	text-align: center;
	margin-bottom: 18.11594upx;
}
.roomPage > .configuration > .configuration-items > .configuration-item > image {
	width: 50.72463upx;
	height: 50.72463upx;
	border-radius: 25.36231upx;
}
.roomPage > .configuration > .configuration-items > .configuration-item > p {
	color: #8e9093;
	font-size: 25.36231upx;
}

.roomPage > .configuration > .lookall {
	text-align: center;
	padding: 21.73913upx 0;
}

.roomPage > .configuration > .lookall .icon-down {
	width: 23.55072upx;
	height: 23.55072upx;
}
.roomPage > .roomNotes > view {
	line-height: normal;
	padding: 19.92753upx 0;
	font-size: 25.36231upx;
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
