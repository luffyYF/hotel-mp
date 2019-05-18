<template>
	<view class="container">
		<view class="describe">
			<view class="d-score">
				<span>描述相符：</span>
				<view class="starList">
					<image
						v-for="(item, index) in score"
						:key="index"
						:src="index >= descScore ? '../../static/images/mylssue/st_star.png' : '../../static/images/mylssue/st_star_active.png'"
						mode=""
						@tap="setDescScore(index)"
						class="s-star"
					></image>
				</view>
				<text class="s-title" v-if="descScore == 5">特别喜欢</text>
				<text class="s-title" v-if="descScore == 4">还不错</text>
				<text class="s-title" v-if="descScore == 3">一般</text>
				<text class="s-title" v-if="descScore == 2">失望</text>
				<text class="s-title" v-if="descScore == 1">差</text>
			</view>
			<view class="d-content">
				<textarea class="d-text" v-model="descContent" value="" placeholder="您对于我们的酒店住房是否满意？说说您的心得体会,分享给想要入住的小伙伴吧" />
			</view>
		</view>
		<view class="service">
			<p>服务评分</p>
			<view class="d-score">
				<span>服务态度：</span>
				<view class="starList">
					<image
						v-for="(item, index) in score"
						:key="index"
						:src="index >= serviceScore ? '../../static/images/mylssue/st_star.png' : '../../static/images/mylssue/st_star_active.png'"
						mode=""
						@tap="setServiceScore(index)"
						class="s-star"
					></image>
				</view>
				<text class="s-title" v-if="serviceScore == 5">特别喜欢</text>
				<text class="s-title" v-if="serviceScore == 4">还不错</text>
				<text class="s-title" v-if="serviceScore == 3">一般</text>
				<text class="s-title" v-if="serviceScore == 2">失望</text>
				<text class="s-title" v-if="serviceScore == 1">差</text>
			</view>
		</view>
		<view><button class="submit" @tap="submitComment()">提交</button></view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import config from '@/utils/config.js';
export default {
	data() {
		return {
			//可评级分数
			score: 5,
			//描述得分
			descScore: 0,
			//服务得分
			serviceScore: 0,
			//描述内容
			descContent: '',
			roomTypeName:'',
			roomTypePk:''
		};
	},
	onLoad(opt) {
		this.roomTypeName=opt.roomTypeName;
		this.roomTypePk=opt.roomTypePk;
	},
	methods: {
		setDescScore(index) {
			this.descScore = index + 1;
		},
		setServiceScore(index) {
			this.serviceScore = index + 1;
		},
		//提交评论
		submitComment() {
			let that=this
			if (that.descScore == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择描述相符评分'
				});
				return;
			}
			if (that.serviceScore == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择服务态度评分'
				});
				return;
			}
			if (that.descContent == '') {
				uni.showToast({
					icon: 'none',
					title: '请填写评价内容'
				});
				return;
			}
			api.comment({
				companyPk: config.COMPANYPK,
				content: that.descContent,
				grade: that.descScore,
				gradeService: that.serviceScore,
				roomTypeName: that.roomTypeName,
				roomTypePk:that.roomTypePk
			}).then(res => {
				if(res.code==1){
					uni.navigateBack({
						delta:1
					})
					uni.showToast({
						icon:'none',
						title:"评价成功"
					})
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
.container {
	height: 100%;
	background-color: #f5f9fc;
	.describe {
		padding: 18.11594upx 0;
		margin-bottom: 36.23188upx;
		background-color: white;
		height: 45%;
		.d-score {
			display: flex;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			.starList {
				display: flex;
				vertical-align: middle;
				align-items: center;
				justify-content: center;
				.s-star {
					width: 36.23188upx;
					height: 36.23188upx;
					margin: 0 9.05797upx;
				}
			}
			.s-title {
				width: 181.15942upx;
				color: #d5d5d5;
				text-align: center;
			}
		}
		.d-content {
			padding: 36.23188upx;
			.d-text {
				width: 100%;
				height: 452.89855upx;
			}
		}
	}
	.service {
		padding: 18.11594upx 18.11594upx;
		margin-bottom: 36.23188upx;
		background-color: white;
		height: 45%;
		.d-score {
			display: flex;
			vertical-align: middle;
			align-items: center;

			.starList {
				display: flex;
				vertical-align: middle;
				align-items: center;
				justify-content: center;
				.s-star {
					width: 36.23188upx;
					height: 36.23188upx;
					margin: 0 9.05797upx;
				}
			}
			.s-title {
				width: 181.15942upx;
				color: #d5d5d5;
				text-align: center;
			}
		}
	}
	.submit {
		position: fixed;
		bottom: 0;

		width: 100%;
		background-color: #cda754;
		color: white;
		font-size: 28.9855upx;
	}
}
</style>
