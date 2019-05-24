<template>
	<view class="aboutusPage">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="关于我们"></uni-nav-bar>
		<view class="CompanyProfile">
			<h2>公司简介</h2>
			<p>
				豪斯格兰（HouseGrand），房源遍布东南亚以及国内各大城市，住客可通过“一键订房”得到极速消费体验，更可通过自助研发的人脸识别技术、扫码开门技术、自助售货机等体验全智能居家生活。
			</p>
			<p>
				商城推出：所见即得理念---房源内的所有物品扫码即可得；每间豪斯格兰酒店的大堂设立独具一格的当地特产区，同时再配合训练有素的客服管家，豪斯格兰酒店会让每一位住客都能享受到家的温暖和“智居共享”的新体验。
			</p>
		</view>
		<view class="about-culture">
			<h4>企业文化</h4>
			<p>
				<span class="about-span1">愿景:</span>
				<span>打造中国最值得信赖的房屋租赁平台</span>
			</p>
			<p>
				<span class="about-span1">使命:</span>
				<span>业主无忧收益，房客舒心睡眠</span>
			</p>
			<p>
				<span class="about-span1">口号:</span>
				<span>客户满意，创造公司满意</span>
			</p>
			<p>
				<span class="about-span1">核心价值观:</span>
				<span>诚信、利他、创新、共享</span>
			</p>
		</view>
		<view class="about-cooperation">
			<h4>商务合作</h4>
			<p>
				<span>电话:</span>
				<span class="about-span2">0756-8677288</span>
			</p>
			<p>
				<span>Email:</span>
				<span>tangjun@housefeel.cn</span>
			</p>
			<p>
				<span>QQ:</span>
				<span>3537854230</span>
			</p>
		</view>
		<view class="about-cooperation">
			<h4>客服服务</h4>
			<p>
				<span>电话:</span>
				<span class="about-span2">400-930-1916</span>
			</p>
			<p>
				<span>Email:</span>
				<span>info@housefeel.cn</span>
			</p>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		back() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
.aboutusPage {
	.CompanyProfile {
		padding: 27.17391upx;
		h2 {
			font-size: 36.23188upx;
			font-weight: 500;
			color: #29271b;
			margin-bottom: 18.11594upx;
		}
		p {
			text-indent: 2em;
			line-height: 30px;
			margin-bottom: 18.11594upx;
			color: #333;
			font-size: 15px;
		}
	}
	.about-culture {
		padding: 27.17391upx;

		h4 {
			font-size: 36.23188upx;
			font-weight: 500;
			color: #29271b;
			margin-bottom: 18.11594upx;
		}
		p {
			line-height: 30px;
			margin-bottom: 10px;
			color: #333;
			font-size: 15px;
			.about-span1 {
				font-weight: bold;
				color: #cda754;
				margin-right: 18.11594upx;
			}
		}
	}
	.about-cooperation {
		padding: 27.17391upx;

		h4 {
			margin-bottom: 10px;
			font-size: 20px;
			color: #29271b;
			font-weight: 500;
		}
		p {
			background: #f3f3f3;
			padding-left: 10px;
			margin-bottom: 0px;
			color: #666;
		}
	}
}
</style>
