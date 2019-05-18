<template>
	<view class="issue">
		<view class="issue-head" v-for="(item, i) in orderList" :key="i">
			<slot name="headPic"></slot>
			<image v-if="headPicShow" :src="item.productPic" class="issue-head-pic" mode=""></image>
			<text class="issue-head-text">描述相符</text>
			<text v-if="headTitleShow" class="issue-head-title">{{ headTitleValue.slice(0, 5) }}</text>

			<view class="issue-head-star-box" v-if="starsShow">
				<image
					v-for="(items, index) in starsMax"
					:key="index"
					:src="index + 1 > item.formatScore ? starDefault : starActive"
					mode=""
					@click="setScore(index + 1, item, i)"
				></image>
				<text class="issue-head-star-text">
					<text v-if="item.formatScore == 5">特别喜欢</text>
					<text v-if="item.formatScore == 4">还不错</text>
					<text v-if="item.formatScore == 3">一般</text>
					<text v-if="item.formatScore == 2">失望</text>
					<text v-if="item.formatScore == 1">差</text>
				</text>
			</view>
			<textarea v-if="textareaShow" @blur="blur" :placeholder="textareaPlaceholder"></textarea>
		</view>
		<view class="logistics">
			<view class="logistics-name">服务评分</view>
			<view class="logistics-service">
				<text style="margin-right: 25upx;">物流服务</text>
				<image v-for="(item, index) in starsMax" :key="index" :src="index + 1 > indexs ? starDefault : starActive" mode="" @click="plus(index + 1)"></image>
				<text class="logistics-service-text">
					<text v-if="indexs == 5">特别喜欢</text>
					<text v-if="indexs == 4">还不错</text>
					<text v-if="indexs == 3">一般</text>
					<text v-if="indexs == 2">失望</text>
					<text v-if="indexs == 1">差</text>
				</text>
			</view>
			<view class="logistics-service">
				<text style="margin-right: 25upx;">服务态度</text>
				<image v-for="(item, index) in starsMax" :key="index" :src="index + 1 > plusnum ? starDefault : starActive" mode="" @click="pluss(index + 1)"></image>
				<text class="logistics-service-text">
					<text v-if="plusnum == 5">特别喜欢</text>
					<text v-if="plusnum == 4">还不错</text>
					<text v-if="plusnum == 3">一般</text>
					<text v-if="plusnum == 2">失望</text>
					<text v-if="plusnum == 1">差</text>
				</text>
			</view>
		</view>
		<view class="issue-btn-box">
			<button v-if="submitShow" class="submit-btn" type="primary" @click="doSubmit">{{ submitText }}</button>
			<slot name="submit"></slot>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		orderList: {
			//商品信息
			type: [Array],
			default: []
		},
		headPicShow: {
			//图片
			type: [String, Boolean],
			default: true
		},
		// headPicValue:'',

		headTitleShow: {
			//标题
			type: [String, Boolean],
			default: true
		},
		headTitleValue: {
			type: String,
			default: '描述相符'
		},

		starsShow: {
			type: [String, Boolean],
			default: true
		},
		starsMax: {
			// 星星最大个数
			type: [String, Number],
			default: 5
		},
		starDefault: {
			//未选中
			type: String,
			default: require('@/static/images/mylssue/st_star.png')
		},
		starActive: {
			type: String,
			default: require('@/static/images/mylssue/st_star_active.png')
		},
		score: {
			//默认分数
			type: [Number, String],
			default: 0
		},
		starsDisabled: {
			//是否禁用star
			type: [Boolean],
			default: false
		},

		textareaShow: {
			// 多行文本显示
			type: [String, Boolean],
			default: true
		},
		textareaPlaceholder: {
			type: [String],
			default: '宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧'
		},

		submitShow: {
			// 发布按钮
			type: [String, Boolean],
			default: true
		},
		submitText: {
			type: String,
			default: '提交'
		},

		infoReceive: {
			// 获取值
			type: Object,
			default: function() {
				return {
					score: 0,
					scores: [],
					textareaValue: [],
					logistics: 0,
					attitude: 0,
					productAttr: []
				};
			}
		}
	},
	data() {
		return {
			indexs: 0,
			plusnum: 0,
			score: 0,
			status: 0
			// evaluate:{},
		};
	},
	computed: {},
	onLoad() {
		console.log(this.score);
	},
	methods: {
		/**
		 * @name 设置分数
		 */
		setScore(score, item, i) {
			this.orderList[i].formatScore = score;
			this.$set(this.orderList, i, this.orderList[i]);
			// this.evaluate.id=this.orderList[i].formatScore;
			this.infoReceive.scores.push({ id: this.orderList[i].formatScore });
			console.log(item);
		},
		/*
		 * 服务评价分
		 * */
		plus(index) {
			console.log(index);
			this.infoReceive.logistics = index;
			// this.evaluate.serviceNum=index;
			this.indexs = index;
		},
		pluss(index) {
			console.log(index);
			this.infoReceive.attitude = index;
			// this.evaluate.logisticsNum=index;
			this.plusnum = index;
		},

		/**
		 * @name 获取textarea内容
		 */

		blur(e) {
			// this.evaluate.textareaValue= e.detail.value;
			this.infoReceive.textareaValue.push(e.detail.value);
			console.log(this.infoReceive.textareaValue);
		},

		/**
		 * @name 提交
		 */
		doSubmit() {
			for (let i = 0; i < this.orderList.length; i++) {
				this.infoReceive.productAttr.push(this.orderList[i].productAttr);
				console.log(this.orderList[i].productAttr);
			}
			this.$emit('submit', this.infoReceive);
		}
	},
	created() {
		// this.infoReceive.score = this.score
	}
};
</script>
<style lang="scss">
$backgroundC: #f9f9f9;
$borderColor: #f5f5f5;
$white: #ffffff;
$fontSize: 28upx;

.issue {
	background-color: $backgroundC;

	&-head {
		background-color: $white;
		border-top: 1upx solid $borderColor;
		padding: 0 25upx;

		&-pic {
			width: 70upx;
			height: 70upx;
			border-radius: 50%;
			vertical-align: middle;
			margin-right: 17upx;
		}

		&-title {
			line-height: 100upx;
			font-size: 30upx;
			vertical-align: middle;
			margin-right: 35upx;
		}

		&-star-box {
			display: inline-block;

			image {
				width: 32upx;
				height: 32upx;
				vertical-align: middle;
				margin-right: 14upx;
			}

			image.active {
				/* animation: star_move ease-in 1 1s,star_rotate ease 1.5s infinite 1s; */
			}
		}
	}

	textarea {
		width: 100%;
		height: 420upx;
		background-color: $white;

		font-size: $fontSize;
		color: #898989;
		padding: 24upx;
		box-sizing: border-box;
		line-height: 40upx;
	}

	&-btn-box {
		padding: 54upx 30upx;

		button {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 80upx;
			font-size: $fontSize;
			background-color: #baa785;
			line-height: 80upx;
		}
	}
}

@keyframes star_move {
	from {
		width: 50upx;
		height: 50upx;
		transform: rotate(180deg);
	}

	to {
		width: 32upx;
		height: 32upx;
		transform: rotate(0);
	}
}

@keyframes star_rotate {
	0% {
		transform: rotateY(360deg);
	}

	100% {
		transform: rotateY(180deg);
	}
}

image {
	width: 32upx;
	height: 32upx;
	vertical-align: middle;
	margin-right: 14upx;
}

.issue-head-text {
	font-size: 26upx;
}

.issue-head-star-text {
	color: #d0d0d0;
	font-size: 26upx;
}

.logistics {
	width: 100%;
	height: 500upx;
	position: relative;
	background: #fff;
	margin-top: 30upx;
	padding: 20upx;
	font-size: 26upx;
}

.logistics-name {
}

.logistics-service {
	font-size: 24upx;
	margin-top: 30upx;
}

.logistics-service-text {
	color: #d0d0d0;
}
</style>
