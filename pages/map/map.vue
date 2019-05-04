<template>
	<view><map style="position:absolute;width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map></view>
</template>

<script>
export default {
	data() {
		return {
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
						borderRadius: 4
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
						borderRadius: 4
					}
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss"></style>
