<template>
	<view><map style="position:absolute;width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map></view>
</template>

<script>
export default {
	data() {
		return {
			mapInfo:{},
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
						padding:'4px'
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
						padding:'4px'
					}
				}
			]
		};
	},
	onLoad(opt) {
		console.log(JSON.parse(opt.mapInfo))
		this.mapInfo=JSON.parse(opt.mapInfo)
		this.title=this.mapInfo.title
		this.covers[0].label.content=this.mapInfo.title
		this.covers[1].label.content=this.mapInfo.title
		this.covers[0].latitude=this.mapInfo.latitude
		this.covers[0].longitude=this.mapInfo.longitude
		this.covers[1].latitude=this.mapInfo.latitude
		this.covers[1].longitude=this.mapInfo.longitude
		console.log(this.covers)
	},
	methods: {}
};
</script>

<style lang="scss"></style>
