<template>
	<roomDetails :roomData="roomData" @closeRoom="closeRoom" @gotoPrice="gotoPrice"></roomDetails>
</template>
<script>
import roomDetails from '@/components/roomDetails/roomDetails';
import allocation from '@/utils/config.js';
import user from '@/services/user.js';
import api from '@/utils/api';
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
		this.roomData=JSON.parse(opt.obj);
	},
	methods: {
		//房间详情提交
		gotoPrice(e) {
			let that = this;
			user.isUserinfo()
				.then(res => {
					//先关闭页面
					that.closeRoom();
					//跳转到订单填写页
					var obj = {
						roomTypeInfo: e, //房间信息
						globalData: that.globalData, //入住时间和退房时间
						beginDate: that.beginDate, //入住日期
						endDate: that.endDate //退房日期
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
