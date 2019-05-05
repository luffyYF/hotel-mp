<template>
	<view class="commentPage">
		<view class="uni-comment">
			<view class="uni-comment-list" v-for="(object,index) in count" :key='index'>
				<view class="uni-comment-face"><image src="../../static/images/comment/user-img.jpg" mode="" style="height: 72.46376upx;"></image></view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text class="name">网友</text>
					</view>
					<view class="uni-comment-date">
						<text>08/10 08:12</text>
						<view>
							<image style="height:27.17391upx;width: 27.17391upx;" src="../../static/images/room/star.png" mode=""></image>
							<image style="height:27.17391upx;width: 27.17391upx;" src="../../static/images/room/star.png" mode=""></image>
							<image style="height:27.17391upx;width: 27.17391upx;" src="../../static/images/room/star.png" mode=""></image>
							<image style="height:27.17391upx;width: 27.17391upx;" src="../../static/images/room/star.png" mode=""></image>
							<image style="height:27.17391upx;width: 27.17391upx;" src="../../static/images/room/star.png" mode=""></image>
						</view>
					</view>
					<view class="uni-comment-content">
						很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App
						<view class="commentImg"><image @tap="showImg" src="http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg" mode=""></image></view>
						<view class="commentImg"><image @tap="showImg" src="http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg" mode=""></image></view>
						<view class="commentImg"><image @tap="showImg" src="http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg" mode=""></image></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			count:10
		};
	},
	methods:{
		showImg(){
			uni.previewImage({
				urls:['http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg','http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg','http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg']
			})
		}
	}
};
</script>

<style lang="scss">
.commentPage {
	padding: 18.11594upx;
}
.uni-comment {
	width: 100%;
	.uni-comment-list {
		display: flex;
		.uni-comment-top{
			text{
				font-size: 32.60869upx;
			}
		}
		.uni-comment-content{
			
			.commentImg{
				image{
					width:26%;
					height: 126.81159upx;
					float: left;
					margin: 18.11594upx;
				}
			}
		}
	}
}
</style>
