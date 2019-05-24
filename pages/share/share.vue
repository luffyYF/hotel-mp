<template>
	<view>
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="分享"></uni-nav-bar>
		<view class="share-img1"><image src="../../static/images/user/share_img.jpg" mode="widthFix"></image></view>
		<view class="share-img2">
			<view>
				<image src="../../static/images/user/wx.png" mode=""></image>
				<p>微信好友</p>
			</view>
			<view>
				<image src="../../static/images/user/moments.png" mode=""></image>
				<p>朋友圈</p>
			</view>
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
export default {
	components: {
		uniNavBar,
		uniIcon
	},
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
.share-img1 {
	image {
		width: 100%;
	}
}
.share-img2 {
	display: flex;
	vertical-align: middle;
	align-content: center;
	justify-content: center;
	view {
		flex: 1;
		text-align: center;
		image {
			padding-top: 90.57971upx;
			width: 108.69565upx;
			height: 108.69565upx;
		}
	}
}
</style>
