<template>
	<view class='hotel-query'>
		<!-- 轮播图banner -->
		<!-- <swiper :autoplay="autoplay" :interval="interval" :duration="duration" class='swiper-box'>
			<block v-for="item of swiperImgs" :key="index">
				<swiper-item>
					<image :src="item.imgUrl" class="slide-image" />
				</swiper-item>
			</block>
		</swiper> -->
		<img class="img-bg" src="/static/images/home/banner_hotel_2.jpg" mode='scaleToFill' style="filter: opacity(100%);">
		<view class="card-list">
			<!-- 搜索框 -->
			<view class='search-box'>
				<view class='search-item' hover-class='hover-class' bindtap='pickCity'>
					<text class='show-address'>{{searchCondition.address}}</text>
					<view class='my-address'>
						<image class='address-icon' src='/static/images/home/dinwei.png'></image>
						<text>我的位置</text>
					</view>
				</view>
				<view class='search-item' bindtap='pickDate'>
					<!-- 入住 -->
					<view class='date-item' hover-class='hover-class'>
						<text>{{searchCondition.checkIn.month}}月{{searchCondition.checkIn.day}}日</text>
						<view class='check-info'>
							<view>周{{searchCondition.checkIn.week}}</view>
							<view>入住</view>
						</view>
					</view>
					<!-- 入住天数 -->
					<view class='date-item'>
						<view class='check-days'>
							<image src='/static/images/home/yue.png' class='check-moon' mode='widthFix'></image>
							<text>共{{(searchCondition.checkOut.timeStamp-searchCondition.checkIn.timeStamp)/86400000}}晚</text>
						</view>
					</view>
					<!-- 离店 -->
					<view class='date-item' hover-class='hover-class'>
						<text>{{searchCondition.checkOut.month}}月{{searchCondition.checkOut.day}}日</text>
						<view class='check-info'>
							<view>周{{searchCondition.checkOut.week}}</view>
							<view>离店</view>
						</view>
					</view>
				</view>
				<view class='search-item' hover-class='hover-class'>
					<input placeholder="请输入关键字/酒店/地址" class='search-ipt' />
				</view>
				<view class='search-item' hover-class='hover-class'>
					<input placeholder="价格星级" class='search-ipt' />
				</view>
				<button class='check-btn searchBtn' bindtap='filterMore'>查找酒店</button>
			</view>
			<!-- 功能入口 -->
			<view class="tool row">
				<view class="col" col-6="">
					<view class="inner">
						<view>
							<h3>豪斯优选</h3>
							<span>优质好货</span>
						</view>
						<img src="/static/images/home/home_store.png" mode='widthFix'>
					</view>
				</view>
				<view class="col" col-6="">
					<view class="inner">
						<view>
							<h3>豪斯投资</h3>
							<span>理财优选</span>
						</view>
						<img src="/static/images/home/home_tz.png" mode='widthFix'>
					</view>
				</view>
			</view>
			<!-- 酒店预订 -->
			<view class="card-list card card-ios hotels">
				<view text-center="" class="card-header card-header-ios">
					<h2 class="header-title">
						<span>优选酒店</span>
					</h2>
					<p class="header-subtitle">YOUR BEST CHOICE</p>
				</view>
				<!---->
				<view class="card-content card-content-ios hotels-content">
					<image src="http://www.housefeel.cn/file/rentPath/20181214180440638808038.jpg" mode='aspectFill'>
						<span class="tag">¥198/<view class="small">晚</view>
						</span>
					</image>

					<view class="card-title card-title-ios">
						香泉酒店 - 商务双人房
					</view>
					<p>
						<span class="grade">5.0</span>
						<score>
							<div class="star-div">
								<!---->
								<div>
									<ion-icon color="chrome3" role="img" class="icon icon-ios icon-ios-chrome3 ion-ios-star" aria-label="star"></ion-icon>
								</div>
								<div>
									<ion-icon color="chrome3" role="img" class="icon icon-ios icon-ios-chrome3 ion-ios-star" aria-label="star"></ion-icon>
								</div>
								<div>
									<ion-icon color="chrome3" role="img" class="icon icon-ios icon-ios-chrome3 ion-ios-star" aria-label="star"></ion-icon>
								</div>
								<div>
									<ion-icon color="chrome3" role="img" class="icon icon-ios icon-ios-chrome3 ion-ios-star" aria-label="star"></ion-icon>
								</div>
								<div>
									<ion-icon color="chrome3" role="img" class="icon icon-ios icon-ios-chrome3 ion-ios-star" aria-label="star"></ion-icon>
								</div>
							</div>
						</score>
					</p>
					<p>珠海.凤凰北香埠路116号</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoplay: true,
				interval: 3000,
				duration: 1000,
				imgMode: 'aspectFit',
				keyWordDisabled: true,
				priceStarDisabled: true,
				today: '',
				searchCondition: {
					address: '贵阳',
					checkIn: '',
					checkOut: '',
				},
				swiperImgs: [{
						imgUrl: '/static/images/index/ad_pic1.png',
						toUrl: ''
					},
					{
						imgUrl: '/static/images/index/ad_pic1.png',
						toUrl: ''
					}
				],
				funcEntrances: [{
						icon: '/static/images/icon/icon_rights.png',
						text: '会员权益'
					},
					{
						icon: '/static/images/icon/icon_clock.png',
						text: '十元抢房'
					},
					{
						icon: '/static/images/icon/icon_hour.png',
						text: '钟点房'
					}
				],
				hotelList: [{
						hotelName: '汉唐大酒店（贵阳中天会展城店）',
						hotelPic: '/static/images/index/hotel_pic.png',
						hotelScore: '4.7',
						hotelStar: '3',
						hotelAddr: '贵阳观山湖区长岭北路6号（大唐东原财富广场6号楼）',
						hotelDistance: '18.0',
						hotelPrice: '699.0',
						hotelFeatures: [
							'含早餐', '特色2', '特色3'
						]
					},
					{
						hotelName: '汉唐大酒店（贵阳中天会展城店）',
						hotelPic: '/static/images/index/hotel_pic.png',
						hotelScore: '4.7',
						hotelStar: '3',
						hotelAddr: '贵阳观山湖区长岭北路6号（大唐东原财富广场6号楼）',
						hotelDistance: '18.0',
						hotelPrice: '699.0',
						hotelFeatures: [
							'含早餐', '特色2', '特色3'
						]
					},
					{
						hotelName: '汉唐大酒店（贵阳中天会展城店）',
						hotelPic: '/static/images/index/hotel_pic.png',
						hotelScore: '4.7',
						hotelStar: '3',
						hotelAddr: '贵阳观山湖区长岭北路6号（大唐东原财富广场6号楼）',
						hotelDistance: '18.0',
						hotelPrice: '699.0',
						hotelFeatures: [
							'含早餐', '特色2', '特色3'
						]
					}
				]
			}
		},
		onLoad() {},
		/**
		 * 页面显示
		 */
		onShow() {

			let _now_day = new Date();
			_now_day.setHours(0);
			_now_day.setMinutes(0);
			_now_day.setSeconds(0);
			_now_day.setMilliseconds(0);
			// this.globalData.today = Date.parse(_now_day);
			// 入住及离店
			let _checkOut = new Date();
			_checkOut.setHours(0);
			_checkOut.setMinutes(0);
			_checkOut.setSeconds(0);
			_checkOut.setMilliseconds(0);
			_checkOut.setDate(_checkOut.getDate() + 1)
			this.searchCondition.checkIn = this.formatDate(Date.parse(_now_day))
			this.searchCondition.checkOut = this.formatDate(Date.parse(_checkOut))
		},
		onReachBottom() {
			console.log("滑动到页面底部")
			this.getData();
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.refreshing = true;
			this.getData();
		},
		methods: {
			getData() {
				// 				uni.request({
				// 					url: this.$serverUrl + '/api/picture/posts.php?page=' + (this.refreshing ? 1 : this.fetchPageNum) +
				// 						'&per_page=5',
				// 					success: (ret) => {
				// 						console.log("data", ret);
				// 						if (ret.statusCode !== 200) {
				// 							console.log("失败!");
				// 						} else {
				// 							if (this.refreshing && ret.data[0].id === this.list[0].id) {
				// 								uni.showToast({
				// 									title: "已经最新",
				// 									icon: "none",
				// 								})
				// 								this.refreshing = false;
				// 								uni.stopPullDownRefresh();
				// 								return;
				// 							}
				// 							if (this.refreshing) {
				// 								this.refreshing = false;
				// 								uni.stopPullDownRefresh()
				// 								this.list = ret.data;
				// 								this.fetchPageNum = 2;
				// 							} else {
				// 								this.list = this.list.concat(ret.data);
				// 								this.fetchPageNum += 1;
				// 							}
				// 						}
				// 					}
				// 				});
			},
			goDetail(e) {
				uni.navigateTo({
					url: "../detail/detail?data=" + encodeURIComponent(JSON.stringify(e))
				})
			},
			// 将时间戳转化为年月日星期
			formatDate(date) {
				return require('../../filter/dateFilter.js').formatDate(date)
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: "当前环境无分享渠道!",
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : "WXSceneSession",
							type: 0,
							title: "uni-app模版",
							summary: e.title,
							imageUrl: e.img_src,
							href: "https://uniapp.dcloud.io",
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	/* 轮播图 */

	.swiper-box {
		height: 452rpx;
	}

	.swiper-item {
		width: 750rpx;
		height: 100%;
	}

	.img-bg {
		position: -webkit-fixed;
		position: fixed;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
	}

	/* 搜索框 */

	.card-list {
		position: absolute;
		width: 100%;
		top: 255px;
	}

	.search-box {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 702rpx;
		height: 490rpx;
		background-color: #fff;
		border-radius: 5px;
		-webkit-box-shadow: 0 2px 12px rgba(0, 0, 0, .1) !important;
		box-shadow: 0 2px 12px rgba(0, 0, 0, .1) !important;
		padding: 0rpx 50rpx;
		margin: auto;
	}

	.search-item {
		width: 100%;
		font-size: 28rpx;
		color: #333;
		height: 94rpx;
		line-height: 90rpx;
		display: flex;
		justify-content: space-between;
	}

	.search-item:not(:first-child) {
		border-top: 1px solid #eee;
	}

	.show-address {
		display: inline-block;
		max-width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.my-address {
		float: right;
		color: #666;
		font-size: 24rpx;
	}

	.address-icon {
		width: 38rpx;
		height: 38rpx;
		position: relative;
		margin-right: 8rpx;
		vertical-align: middle;
	}

	/* 入住天数 */

	.date-item {
		width: 170rpx;
	}

	.date-item:nth-child(2) {
		width: 160rpx;
	}

	.check-info {
		line-height: 30rpx;
		color: #b89452 !important;
		font-size: 22rpx;
		float: right;
		margin-top: 14rpx;
	}

	.check-days {
		border-bottom: 1px solid #b89452;
		height: 64rpx;
		line-height: 70rpx;
		color: #b89452;
		text-align: center;
		font-size: 12px;
	}

	.check-moon {
		width: 45rpx;
		height: 45rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}

	.search-ipt {
		width: 100%;
		height: 100%;
	}

	.search-ipt:-moz-placeholder {
		color: #999;
	}

	/* 查找btn */
	.check-btn {
		height: 76rpx;
		width: 100%;
		background-color: #ff7a00;
		color: #fff;
		font-size: 32rpx;
	}

	.searchBtn {
		border-radius: 1.2em !important;
		background: linear-gradient(to bottom, #a99344, #cbbe85) !important;
		-webkit-box-shadow: 0 2px 10px rgba(136, 102, 39, .33);
		box-shadow: 0 2px 10px rgba(136, 102, 39, .33);
	}

	.quick-btn {
		color: #ff7a00;
		width: 148rpx;
		height: 76rpx;
		font-size: 24rpx;
		float: right;
		border: 1px solid #ff7a00;
		border-radius: 5px;
		background-color: #fff1e5;
	}

	.icon-quick {
		float: left;
		width: 28rpx;
		height: 46rpx;
		margin-top: 15rpx;
		margin-left: 32rpx;
		margin-right: 12rpx;
	}

	.text-quick {
		float: left;
		width: 60rpx;
		line-height: 32rpx;
		margin-top: 4rpx;
	}

	/* 功能入口 */
	.row {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	.tool {
		padding: 25px 8px;
		padding-bottom: 7px;
	}

	.col {
		padding: 5px;
		position: relative;
		width: 100%;
		margin: 0;
		min-height: 1px;
		-webkit-flex-basis: 0;
		-ms-flex-preferred-size: 0;
		flex-basis: 0;
		-webkit-box-flex: 1;
		-webkit-flex-grow: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		max-width: 100%;
	}

	[col-6] {
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 50%;
		-ms-flex: 0 0 50%;
		flex: 0 0 50%;
		width: 50%;
		max-width: 50%;
	}

	.tool .col {
		padding: 0 5px 16px 5px !important;
	}

	.tool .col .inner {
		background: #fff;
		padding: 15px 10px;
		border-radius: 5px;
		-webkit-box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
		box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.tool .col .inner h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 400;
	}

	.tool .col .inner span {
		color: #666;
		font-size: 14px;
	}

	.tool .col .inner img {
		width: 125upx;
	}

	/* 酒店预订 */
	.hotels.card-list {
		/* border-radius: 10px; */
		border-radius: 10px 10px 0 0;
		margin: 0 15px 0px 15px !important;
		padding: 0 15px;
		width: calc(100% - 60px);
		-webkit-box-shadow: none !important;
		box-shadow: none !important;
		position: initial;
		/* top: 100%; */
		background-color: #fff;
	}

	.hotels .card-header-ios {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 1.6rem;
		font-weight: 500;
		color: #333;
		padding: 16px;
	}

	.hotels.card-list .header-title {
		margin: 2px 0;
		font-weight: 400;
		font-size: 22px;
		text-align: center;
	}

	.hotels.card-list .header-title span {
		position: relative;
		padding: 0 15px;
	}

	.hotels.card-list .header-title span::before {
		content: '{';
		position: absolute;
		left: 0;
		top: -4px;
		font-size: 24px;
	}

	.hotels.card-list .header-title span::after {
		content: '}';
		position: absolute;
		right: 0;
		top: -4px;
		font-size: 24px;
	}

	.hotels.card-list .header-subtitle {
		margin: 0 0 2px;
		font-size: 12px;
		margin-top: 0;
		color: #999;
		text-align: center;
	}

	.hotels .card-header-ios+.card-content-ios,
	.card-ios .item+.card-content-ios {
		padding-top: 0;
	}

	.hotels.card-list .card-content {
		padding-bottom: 10px;
	}

	.hotels.card-list .card-content image {
		width: 100%;
		height: 170px;
		border-radius: 6px;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		-o-object-fit: cover;
		object-fit: cover;
	}

	.hotels .tag {
		position: absolute;
		margin-top: -40px;
		background: rgba(0, 0, 0, .7);
		color: #fff;
		padding: 6px 12px;
		font-weight: 500;
		border-radius: 0 16px 0 16px;
	}

	.hotels .small {
		font-size: 75%;
		display: inline-block;
	}

	.hotels.card-list .card-content p {
		font-size: 14px !important;
		line-height: 14px !important;
		margin: 10px 0 0;
		color: #999;
	}

	.hotels.card-list .card-content p:before {
		display: inline-block;
		content: '';
		width: 0;
		height: 100%;
		vertical-align: middle;
	}

	.hotels.card-list ion-card-content .grade {
		color: #d1b768;
		font-size: 16px;
	}
</style>
