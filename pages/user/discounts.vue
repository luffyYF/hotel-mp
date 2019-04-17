<template>
	<view class="discountsPage">
		<view class="tabs">
			<view class="tabs-title" :class="num == 0 ? 'active' : ''" @click="checked(0)">
				可使用(
				<span></span>
				)
			</view>
			<view class="tabs-title" :class="num == 1 ? 'active' : ''" @click="checked(1)">
				已失效(
				<span></span>
				)
			</view>
		</view>
		<swiper class="swiper" duration="500" :current="num">
			<swiper-item>
				<view class="card-list">
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
					<view class="card-item">
						<image src="../../static/images/user/discounts.png" mode=""></image>
						<view class="card-content">
							<h2>住房代金卷</h2>
							<span>有效期：2018-12-21 ~ 2019-12-21</span>
							<p>可使用</p>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: 0
		};
	},
	methods: {
		checked: function(e) {
			this.num = e;
			this.$emit('selectFunc', e);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f9fc;
	height: 100%;
}
uni-swiper-item {
	overflow-y: auto;
}
.discountsPage {
	height: 100%;
	.tabs {
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
		height: 200%;
		.card-list {
			.card-item {
				height: 144.92753upx;
				margin: 18.11594upx;
				padding: 18.11594upx;
				display: flex;
				vertical-align: middle;
				align-items: center;
				background-color: white;
				border-radius: 18.11594upx;
				image {
					width: 181.15942upx;
					height: 144.92753upx;
				}
				.card-content {
					padding: 18.11594upx;
					h2 {
						font-size: 28.9855upx;
						text-align: left;
						margin-bottom: 18.11594upx;
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
			}
		}
	}
}
</style>
