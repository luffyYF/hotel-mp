<template>
	<view>
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="酒店地图"></uni-nav-bar>
		<map style="position:absolute;width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
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
		return {
			mapInfo: {},
			title: '酒店',
			latitude: 22.244510190871132,
			longitude: 113.5539377784117,
			covers: [
				{
					title: '大酒店',
					width: '20px',
					height: '20px',
					latitude: 22.244510190871132,
					longitude: 113.5539377784117,
					iconPath: '../../static/images/order/icon/mapIcon.png',
					label: {
						content: '大酒店',
						color: '#F76350',
						bgColor: '#fff',
						borderRadius: 4,
						padding: '4px'
					}
				},
				{
					title: '大酒店',
					width: '20px',
					height: '20px',
					latitude: 22.244510190871132,
					longitude: 113.5539377784117,
					iconPath: '../../static/images/order/icon/mapIcon.png',
					label: {
						content: '大酒店',
						color: '#F76350',
						bgColor: '#fff',
						borderRadius: 4,
						padding: '4px'
					}
				}
			]
		};
	},
	onLoad(opt) {
		console.log(JSON.parse(opt.mapInfo));
		this.mapInfo = JSON.parse(opt.mapInfo);
		this.title = this.mapInfo.title;
		this.covers[0].label.content = this.mapInfo.title;
		this.covers[1].label.content = this.mapInfo.title;
		this.covers[0].latitude = this.mapInfo.latitude;
		this.covers[0].longitude = this.mapInfo.longitude;
		this.covers[1].latitude = this.mapInfo.latitude;
		this.covers[1].longitude = this.mapInfo.longitude;
		console.log(this.covers);
	},
	methods: {
		back() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss"></style>
