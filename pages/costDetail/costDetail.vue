<template>
	<view class="costPage">
		<view class="costContent">
			<view class="allPrice">
				<h3>总房费:</h3>
				<p>134.4元</p>
			</view>
			<view class="time">
				<span>2019-04-22</span>
				<span>￥188.0</span>
			</view>
			<view class="detail">
				<view>
					<h3>优惠劵:</h3>
					<p>20元</p>
				</view>
				<view>
					<h3>会员折扣:</h3>
					<p>8折</p>
				</view>
				<view>
					<h3>押金:</h3>
					<p>4元</p>
				</view>
				<view>
					<h3>总价:</h3>
					<p>138.4元</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.costPage {
	padding: 28.9855upx;
	background-color: #f5f9fc!important;
	    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    display: block;
}
.costContent {
	background-color: white;
	border-radius: 9.05797upx;
	.allPrice,
	.time,
	.detail {
		display: flex;
	}
	.allPrice {
		padding: 18.11594upx;
		h3 {
			flex: 1;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-weight: 500;
		}
		p {
			flex: 1;
			text-align: right;
			color: #cda754;
			font-weight: 600;
			font-size: 32.60869upx;
		}
	}
	.time {
		padding: 18.11594upx;
		border-bottom: 1px solid #f6f7f9;
		span {
			overflow: inherit;
			font-size: 14px;
			line-height: normal;
			font-weight: 600;
			text-overflow: inherit;
			color: #8e9093;
			margin: 0 0 2px;
		}
	}
	.detail {
		display: block;
		view {
			display: flex;
			padding: 18.11594upx;
			h3 {
				flex: 1;
				font-weight: 500;
			}
			p {
				flex: 1;
				justify-content: flex-end;
				color: #cda754;
				font-weight: 600;
				font-size: 32.60869upx;
			}
		}
	}
}
</style>
