<template>
	<scroll-view class="invoicePage">
		<view class="invoiceType">
			<view class="options">
				<view class="single" :class="options == 1 ? 'active' : ''" @tap="selType(1)"><p>不需要发票</p></view>
				<view class="single" :class="options == 2 ? 'active' : ''" @tap="selType(2)"><p>(个人)普通发票</p></view>
				<view class="single" :class="options == 3 ? 'active' : ''" @tap="selType(3)">
					<p>
						电子发票
						<span style="display: block; font-size: 21.73913upx;">发至您的邮箱</span>
					</p>
				</view>
				<view class="single" :class="options == 4 ? 'active' : ''" @tap="selType(4)"><p>(公司)专用发票</p></view>
			</view>
		</view>
		<view class="invoiceDetails">
			<view class="invoiceExplain">
				<p class="explainTitle">开票说明</p>
				<ul class="explain-ul">
					<li class="e-li">
						<p>
							<span style="color:#DD524D;">代理商开票,离开后4个工作日</span>
							内发送至邮箱
						</p>
					</li>
					<li class="e-li">
						<p>
							开票城市为
							<span style="color:#DD524D;">珠海市</span>
							,可能与您入住酒店城市不一致,您可选择在发票上备注酒店名称及入离日期
						</p>
					</li>
				</ul>
			</view>
			<view class="invoiceTitle">
				<p>发票抬头</p>
				<input type="text" placeholder="请添加抬头信息" placeholder-style="font-size: 32.60869upx;" />
				<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
			</view>
			<view class="invoiceTitle">
				<p>发票项目</p>
				<input type="text" placeholder="*旅游服务*代订房费" placeholder-style="font-size: 32.60869upx;color:#000" />
				<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
			</view>
			<view class="invoiceTitle">
				<p>收票人姓名</p>
				<input type="text" placeholder="填写收票人姓名" placeholder-style="font-size: 32.60869upx;" />
			</view>
			<view class="invoiceTitle">
				<p>收票人手机</p>
				<input type="text" placeholder="填写收票人手机" placeholder-style="font-size: 32.60869upx;" />
			</view>
			<view class="invoiceTitle">
				<p>收票人邮箱</p>
				<input type="text" placeholder="用来接收电子发票" placeholder-style="font-size: 32.60869upx;" />
			</view>
			<view class="invoiceTitle">
				<p style="flex: 1;color: #000000;">需要备注酒店名称及日期</p>
				<label class="checkbox"><checkbox value="" checked="" /></label>
			</view>
		</view>
		<view class="submit">
			<button type="primary" style="background-color:rgb(253,151,0) ;">提交</button>
			<ul class="s-ul">
				<li class="s-li">
					<p>
						发票金额:
						<span>￥340（房费￥340）</span>
					</p>
				</li>
				<li class="s-li"><p>您可在“订单页-查看发票”获取发票开具状态等信息</p></li>
			</ul>
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			options: 1
		};
	},
	methods: {
		selType(options) {
			this.options = options;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f9fc;
}
.invoicePage {
	.invoiceType {
		padding-left: 18.11594upx;
		padding-top: 18.11594upx;
		background-color: white;
		margin-bottom: 18.11594upx;
		overflow: hidden;
		.options {
			width: 100%;
			.single {
				width: 46%;
				height: 108.69565upx;
				font-size: 32.60869upx;
				float: left;
				margin-right: 18.11594upx;
				margin-bottom: 18.11594upx;
				text-align: center;
				border: 1px solid rgb(0, 196, 176);
				display: flex;
				vertical-align: middle;
				align-items: center;
				justify-content: center;
				border-radius: 9.05797upx;
			}
			.active {
				color: white;
				background-color: rgb(0, 196, 176);
			}
		}
	}
	.invoiceDetails {
		background-color: white;
		padding: 18.11594upx;
		padding-bottom: 0;
		margin-bottom: 18.11594upx;
		.invoiceExplain {
			padding-bottom: 18.11594upx;
			border-bottom: 1px solid #f5f9fc;
			.explainTitle {
				color: #666;
				font-size: 25.36231upx;
				padding: 18.11594upx 0;
			}
			.explain-ul {
				list-style: disc !important;
				font-size: 28.9855upx;
				.e-li {
					display: flex;
					vertical-align: middle;
					align-items: center;
					padding-left: 18.11594upx;
					margin-bottom: 18.11594upx;
					p{
						line-height: normal;
					}
				}
				.e-li::before {
					content: '';
					position: absolute;
					display: block;
					width: 3px;
					height: 3px;
					left: 10px;
					background-color: #000;
					border-radius: 50%;
				}
			}
		}
		.invoiceTitle {
			display: flex;
			padding: 18.11594upx 0;
			border-bottom: 1px solid #f5f9fc;
			vertical-align: middle;
			align-items: center;
			p {
				color: #666;
				font-size: 25.36231upx;
				flex: 0.4;
			}
			input {
				flex: 1;
			}
		}
	}
	.submit {
		padding: 18.11594upx;
		.s-ul {
			margin-top: 18.11594upx;
			color: #666;
			p > span {
				color: chocolate;
			}
			.s-li {
				display: flex;
				vertical-align: middle;
				align-items: center;
				padding-left: 18.11594upx;
				p {
					font-size: 25.36231upx !important;
				}
			}
			.s-li::before {
				content: '';
				position: absolute;
				display: block;
				width: 3px;
				height: 3px;
				left: 10px;
				background-color: #000;
				border-radius: 50%;
			}
		}
	}
}
</style>
