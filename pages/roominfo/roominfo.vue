<template>
	<view class="">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="房间详情"></uni-nav-bar>
		<roomDetails :roomData="roomData" @gotoPrice="gotoPrice"></roomDetails>
	</view>
</template>
<script>
import roomDetails from '@/components/roomDetails/roomDetails';
import allocation from '@/utils/config.js';
import user from '@/services/user.js';
import api from '@/utils/api';
var app = getApp();
export default {
	components: {
		roomDetails
	},
	data() {
		return {
			roomData: {}
		};
	},
	onLoad(opt) {
		this.roomData = JSON.parse(opt.obj);
	},
	methods: {
		back(){
			uni.navigateBack();
		},
		//房间详情提交
		gotoPrice(e) {
			let that = this;
			user.isUserinfo()
				.then(res => {
					/* 	console.log(res); */

					//跳转到订单填写页
					var obj = {
						roomTypeInfo: e, //房间信息
						globalData: app.$vm.globalData, //入住时间和退房时间
						beginDate: that.roomData.beginDate, //入住日期
						endDate: that.roomData.endDate //退房日期
					};
					uni.navigateTo({
						url: '../placeOrder/placeOrder?roomInfo=' + JSON.stringify(obj)
					});
				})
				.catch(res => {
					uni.navigateTo({
						url: '../login/login'
					});
				});
		}
	}
};
</script>
<style></style>
