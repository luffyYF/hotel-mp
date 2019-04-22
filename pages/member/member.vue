<template>
	<view>
		<view class="memberPage">
			<view class="m-top">
				<image src="../../static/images/member/memberbanner.jpg" mode="widthFix" style="width: 100%;"></image>
				<image src="../../static/images/member/member_tit.jpg" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="m-content">
				<view class="m-class">
					<view class="section">
						<view class="title">
							<span>会员</span>
							<image src="../../static/images/member/ORDINARY.png" mode="widthFix" style="width: 24px;height: 24px;"></image>
						</view>
						<p>新用户注册成功后自动升级为注册会员，可获取100元代金劵。代金券不可兑换现金，代金券使用有效期限为一年。</p>
					</view>
					<view class="section">
						<view class="title">
							<span>银卡会员</span>
							<image src="../../static/images/member/FORMAL.png" mode="widthFix" style="width: 24px;height: 24px;"></image>
						</view>
						<p>用户在豪斯格兰酒店累计消费满3间夜，自动升级为白银会员，通过豪斯格兰酒店预定消费即可享受9折优惠。</p>
					</view>
					<view class="section">
						<view class="title">
							<span>金卡会员</span>
							<image src="../../static/images/member/GOLDEN.png" mode="widthFix" style="width: 24px;height: 24px;"></image>
						</view>
						<p>用户在豪斯格兰酒店消费累计满30间夜，自动升级为黄金会员，通过豪斯格兰酒店预定消费即可享受8.5折优惠。</p>
					</view>
					<view class="section">
						<view class="title">
							<span>钻石会员</span>
							<image src="../../static/images/member/DIAMOND.png" mode="widthFix" style="width: 24px;height: 24px;"></image>
						</view>
						<p>用户在豪斯格兰酒店消费累计满60间夜，自动升级为钻石会员，通过豪斯格兰酒店预定消费即可享受8折优惠。</p>
					</view>
				</view>
				<view class="m-rule">
					<h4 class="r1-h">//&nbsp;&nbsp;&nbsp;&nbsp;积分兑换规则&nbsp;&nbsp;&nbsp;&nbsp;//</h4>
					<h4 class="r2-h">如何获取积分？</h4>
					<view class="box">
						<p>
							1.用户在豪斯格兰酒店每消费100元，即可获得100个积分
							<span class="tip">（即1元人民币等于1个积分）</span>
						</p>
						<p>2.用户每推荐一个新用户关注微信公众号并注册，即可获得10个积分。</p>
						<p>
							3.用户在豪斯格兰酒店每一次评价：
							<br />
							(1)评论内容填写15个字以上赠送2个积分；
							<br />
							(2)评论加内容填写15个字以上以及晒2张图赠送积3个积分；
							<br />
							(3)评论加内容填写20个字以上以及晒5张图赠送积5个积分。
						</p>
					</view>
					<h4 class="r2-h">积分兑换事项</h4>
					<view class="box">
						<p>
							1.积分可在平台兑换物品
							<br />
							积分达到3000个积分，即可免费入住豪斯格兰酒店价值300元以内的房间一晚（包含300元）；积分达到4000个积分，即可免费入住豪斯格兰酒店价值400元以内的房间一晚（包含400元），以此类推。
						</p>
						<p>2.积分兑房免费入住需提前1天预订，时间仅限周一至周四，周末及节假日暂不享受积分兑房，积分兑房不提供发票。</p>
						<p>3.豪斯格兰酒店积分兑换用户可在全国任何豪斯格兰进驻的城市分点预定。</p>
						<p>4.会员资格永久有效，会员积分永不清零。</p>
					</view>
				</view>
				<p class="bottom_back">在法律允许情况下，最终解释权归豪斯格兰酒店管理(珠海)有限公司</p>
				<p class="footer">
					豪斯格兰酒店管理(珠海)有限公司
					<br />
					House Grand Hotel Management (Zhuhai) Co., Ltd.
				</p>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
.m-content {
	.m-class {
		padding: 28.9855upx;
		.section {
			.title {
				font-size: 27.17391upx;
				font-weight: 700;
				color: #555;
				border-left: 7.24637upx solid #ff8c3f;
				padding-left: 18.11594upx;
				margin: 18.11594upx 0;
				line-height: 27.17391upx;
				display: flex;
				vertical-align: middle;
				align-items: center;
				span {
					font-size: 15px;
					margin-right: 5px;
				}
			}
			p {
				font-size: 14px;
				margin: 14px 0;
			}
		}
	}
	.m-rule {
		margin: 0;
		background: #b19c7c;
		overflow: hidden;
		color: #fdfaed;
		padding: 20px 16px;
		line-height: 23px;
		.r1-h {
			color: #fff;
			text-align: center;
			font-size: 26px;
			font-weight: 600;
			padding: 10px 0;
		}
		.r2-h {
			color: #fff;
			text-align: center;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			background: #e0ce97;
			width: 200px;
			font-size: 20px;
			margin: 30px auto 0;
			line-height: 35px;
		}
		.box {
			background: #fff;
			margin: 0 10px 15px;
			color: #666;
			padding: 18px;
			p {
				margin-top: 0;
				font-size: 14px;
				padding-bottom: 16px;
				.tip {
					color: red;
				}
			}
		}
	}
	.bottom_back {
		background: #988568;
		color: #fff;
		padding: 10px 16px;
		font-size: 13px;
		margin-top: 0;
	}
	.footer {
		text-align: center;
		padding: 18.11594upx;
		font-size: 12px;
		color: #999;
	}
}
</style>
