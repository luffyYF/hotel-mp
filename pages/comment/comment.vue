<template>
	<view class="commentPage">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="评论列表"></uni-nav-bar>
		<view class="uni-comment">
			<view class="uni-comment-list" v-for="(item, index) in ListComment" :key="index">
				<view class="uni-comment-face"><image src="../../static/images/comment/user-img.jpg" mode="" style="height: 72.46376upx;"></image></view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text class="name">{{ item.memName }}</text>
					</view>
					<view class="uni-comment-date">
						<text>{{ item.createTime }}</text>
						<view class="starList">
							<image
								v-for="(item, index) in 5"
								:key="index"
								:src="index >= item.grade ? '../../static/images/mylssue/st_star.png' : '../../static/images/mylssue/st_star_active.png'"
								mode=""
								class="s-star"
							></image>
						</view>
					</view>
					<view class="uni-comment-content">
						{{ item.content }}
						<view class="commentImg">
							<image @tap="showImg" src="http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg" mode=""></image>
						</view>
						<view class="commentImg">
							<image @tap="showImg" src="http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg" mode=""></image>
						</view>
						<view class="commentImg">
							<image @tap="showImg" src="http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/utils/api';
import config from '@/utils/config.js';
export default {
	
	data() {
		return {
			ListComment: []
		};
	},
	onLoad() {
		let that = this;
		api.listComment({
			filterType: 'ALL',
			pageNum: 1,
			pageSize: 10,
			companyPk: config.COMPANYPK
		}).then(res => {
			console.log(res);
			if (res.code == 1) {
				that.ListComment = res.data.list;
			}
		});
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		showImg() {
			uni.previewImage({
				urls: [
					'http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg',
					'http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg',
					'http://img.zx123.cn/Resources/zx123cn/uploadfile/2017/0222/20170222165608_36883.jpg'
				]
			});
		}
	}
};
</script>

<style lang="scss">

.uni-comment {
	padding: 18.11594upx;
	.uni-comment-list {
		display: flex;
		.uni-comment-top {
			text {
				font-size: 32.60869upx;
			}
		}
		.uni-comment-date {
			.starList {
				display: flex;
				vertical-align: middle;
				align-items: center;
				justify-content: center;
				.s-star {
					width: 36.23188upx;
					height: 36.23188upx;
				}
			}
		}
		.uni-comment-content {
			.commentImg {
				image {
					width: 26%;
					height: 126.81159upx;
					float: left;
					margin: 18.11594upx;
				}
			}
		}
	}
}
</style>
