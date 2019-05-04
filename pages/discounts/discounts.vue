<template>
	<view class="discountsPage">
		<view class="tabs">
			<view class="tabs-title" :class="num == 0 ? 'active' : ''" @tap="checked(0)">
				可使用(
				<span>{{effectiveList.length}}</span>
				)
			</view>
			<view class="tabs-title" :class="num == 1 ? 'active' : ''" @tap="checked(1)">
				已失效(
				<span>{{invalidList.length}}</span>
				)
			</view>
		</view>
		<swiper class="swiper" duration="500" :current="num" @change="change">
			<swiper-item>
				<view class="card-list">
					<view class="card-item" v-for="(item, index) in effectiveList" :key="index" @tap="selCoupons(item)">
						<view class="card-img">￥{{item.value}}</view>
						<view class="card-content">
							<h2>{{item.couponName}}</h2>
							<span>有效期：{{item.beginDate}} ~ {{item.endDate}}</span>
							<p>可使用</p>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="card-list">
					<view class="card-item" style="opacity: .6;" v-for="(item, index) in invalidList" :key="index">
						<view class="card-img">￥{{item.value}}</view>
						<view class="card-content">
							<h2>{{item.couponName}}</h2>
							<span>有效期：{{item.beginDate}} ~ {{item.endDate}}</span>
							<p>已失效</p>
						</view>
						<view class="card-lose"><image src="../../static/images/user/invalid.png" mode=""></image></view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: 0,
			invalidList:[],
			effectiveList:[]
		};
	},
	onLoad(opt){
		var obj = JSON.parse(opt.obj);
		/* console.log(obj) */
		this.invalidList=obj.invalidList;
		this.effectiveList=obj.effectiveList;		
	},
	methods: {
		change(e) {
			this.num = e.detail.current;
		},
		checked: function(e) {
			this.num = e;
			this.$emit('selectFunc', e);
		},
		selCoupons(item){
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			var prevPage = pages[pages.length - 2]; //上一个页面
			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			prevPage.setData({
				selCoupons: item
			});
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f9fc;
	height: 100%;
}
.tabs{
	position: fixed;
}
.discountsPage {
	height: 100%;
	.tabs {
		position: fixed;
		width: 100%;
		z-index: 66;
		display: flex;
		align-items: center;
		background-color: #ffffff;
		/* -webkit-box-ordinal-group: 4; */
		.tabs-title {
			flex: 1;
			text-align: center;
			font-size: 25upx;
			border: none;
			color: #333;
			height: 44px;
			line-height: 44px;
		}
		.active {
			background: 0 0;
			color: #cda754;
			border-bottom: 2px solid #cda754;
		}
	}
	.swiper {
		height: 100%;
		position: relative;
		top: 81.52173upx;

		overflow-y: auto;
		swiper-item {
			overflow-y: auto;
		}
		.card-list {
			top: 81.52173upx;
			.card-item {
				height: 100px;
				margin: 27.17391upx;
				
				display: flex;
				vertical-align: middle;
				align-items: center;
				background-color: white;
				position: relative;
				border-radius: 18.11594upx;
				overflow: hidden;
				.card-img {
					background: url('../../static/images/user/coupon_head.png') no-repeat center center;
					align-items: center;
					vertical-align: middle;
					justify-content: center;
					height: 100px;
					display: flex;
					width: 90px;
					background-size: 100% 100%;
					color: #f9df97;
					font-size: 43.47826upx;
					font-weight: bold;
				}

				.card-content {
					padding-left: 18.11594upx;
					flex: 1;
					background: url(../../static/images/user/invaid_coupon_conter.png) no-repeat center center;
					background-size: 100% 100%;
					height: 100px;
					position: relative;
					overflow: hidden;
					h2 {
						font-size: 28.9855upx;
						text-align: left;
						margin-bottom: 18.11594upx;
						padding-top: 18.11594upx;
						font-weight: 500;
						
					}
					span {
						display: block;
						font-size: 21.73913upx;
						text-align: left;
						margin-bottom: 9.05797upx;
					}
					p {
						color: #999;
						margin-top: 0;
						font-size: 21.73913upx;
					}
				}
				.card-lose {
					image {
						width: 144.92753upx;
						height: 144.92753upx;
						transform: rotate(-30deg);
						position: absolute;
						right: -18.11594upx;
						top: 54.34782upx;
					}
				}
			}
		}
	}
}
</style>
