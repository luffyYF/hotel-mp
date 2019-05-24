<template>
	<view>
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="酒店展示图"></uni-nav-bar>
		<view class="tabs">
			<view v-for="(item, index) in imagesList" :key="index" class="tabs-title" :class="num == index ? 'active' : ''" @click="checked(index)">{{ item.name }}</view>
		</view>
		<scroll-view scroll-y class="content">
			<!-- <view class="imagesList"><image v-for="(item, index) in imagesList[num].images" :key="index" @tap="showImg(index)" :src="item" mode="aspectFill"></image></view> -->
			<div class="masonry">
				<div class="column" v-for="(item, index) in imagesList[num].images" :key="index" @tap="showImg(item.title)">
					<div class="item">
						<div class="item__content"><image :src="item.images" mode="widthFix" lazy-load="true"></image></div>
					</div>
					<!-- more items -->
				</div>
			</div>
		</scroll-view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import config from '@/utils/config.js';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
export default {
	components: {
		uniNavBar,
		uniIcon
	},
	data() {
		return {
			num: 0,
			imagesList: [],
			all: {
				name: '全部',
				images: []
			},
			IMGROOTURL: '',
			allImage: []
		};
	},
	onLoad() {
		let that = this;
		api.imagesList({
			companyPk: config.COMPANYPK
		}).then(res => {
			if (res.code == 1) {
				that.imagesList = res.data;
				that.IMGROOTURL = config.IMGROOTURL;
				var count = 0;
				for (var i = 0; i < that.imagesList.length; i++) {
					for (var j = 0; j < that.imagesList[i].images.length; j++) {
						var obj = {};
						obj.title = count;
						count++;
						obj.images = that.IMGROOTURL + that.imagesList[i].images[j].substr(1);
						that.allImage.push(that.IMGROOTURL + that.imagesList[i].images[j].substr(1));
						that.imagesList[i].images[j] = obj;
						that.all.images.push(obj);
					}
				}
				that.imagesList.push(that.all);
				that.imagesList = that.imagesList.reverse();
			}
		});
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		checked(flag) {
			this.num = flag;
		},
		showImg(i) {
			uni.previewImage({
				current: i,
				urls: this.allImage
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

.content {
	width: 100%;
	margin-top: 85.14492upx;
	padding-top: 9.05797upx;
	.masonry {
		column-count: 2;
		column-gap: 9.05797upx;
	}

	.item {
		break-inside: avoid;
		display: block;

		.item__content {
			text-align: center;
			image {
				width: 100%;
				display: block;
				margin-bottom: 9.05797upx;
			}
		}
	}
}
</style>
