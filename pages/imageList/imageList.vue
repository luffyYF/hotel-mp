<template>
	<view>
		<view class="tabs">
			<view v-for="(item, index) in imagesList" :key="index" class="tabs-title" :class="num == index ? 'active' : ''" @click="checked(index)">{{ item.name }}</view>
		</view>
		<scroll-view scroll-y class="content">
			<view class="imagesList">
				<image v-for="(item, index) in imagesList[num].images" :key="index" @tap="showImg(index)" :src="item" mode="widthFix">
					
				</image>
				</view>
		</scroll-view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import config from '@/utils/config.js';
export default {
	data() {
		return {
			num: 0,
			imagesList: [],
			IMGROOTURL: ''
		};
	},
	onLoad() {
		let that = this;
		api.imagesList({
			companyPk: config.COMPANYPK
		}).then(res => {
			if (res.code == 1) {
				that.imagesList = res.data.reverse();
				that.IMGROOTURL = config.IMGROOTURL;
				for (var i = 0; i < that.imagesList.length; i++) {
					for (var j = 0; j < that.imagesList[i].images.length; j++) {
						that.imagesList[i].images[j] = that.IMGROOTURL + that.imagesList[i].images[j].substr(1);
					}
				}
			}
		});
	},
	methods: {
		checked(flag) {
			this.num = flag;
		},
		showImg(i) {
			uni.previewImage({
				current: i,
				urls: this.imagesList[this.num].images
			});
		}
	}
};
</script>

<style lang="scss">
.tabs {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 999;
	border-bottom: 1px solid #f7f9fb;

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
.imagesList {
	column-count:2;
	column-gap:9.05797upx;
	/* display: flex;
	justify-content: space-around;
	flex-wrap: wrap; */
	image {
		/* display: block; */
		width: 362.31884upx;
	}
}
.content {
	width: 100%;
	margin-top: 85.14492upx;
}
</style>
