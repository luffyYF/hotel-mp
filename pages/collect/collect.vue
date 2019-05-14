<template>
	<view>
		<view class="collect-item" v-for="(item, index) in collectList" :key="index" @tap="gotoRoomInfo(item)">
			<image class="collect-icon" src="../../static/images/user/onChose.png" mode="" @tap="collectCancel(item)"></image>
			<image class="collect-img" :src="IMGURL + item.coverImage" mode=""></image>
			<view class="collect-title">
				<h2>{{ item.roomTypeName }}</h2>
				<p>￥{{ item.collectPrice }}</p>
			</view>
		</view>
		<roomDetails v-if="isRoomDetails" :roomData="roomData" @closeRoom="closeRoom"></roomDetails>
	</view>
</template>

<script>
import roomDetails from '@/components/roomDetails/roomDetails';
import utils from '@/utils/util';
import api from '@/utils/api';
import allocation from '@/utils/config.js';
import user from '@/services/user.js';
var app = getApp();
export default {
	components: {
		roomDetails
	},
	data() {
		return {
			count: 10,
			collectList: [],
			IMGURL: '',
			isRoomDetails: false,
			beginDate: '',
			endDate: '',
			globalData: {
				code: '',
				userInfo: null,
				today: '',
				checkIn: '',
				checkOut: ''
			},
			userInfo: {},
			roomData: {}
		};
	},
	onLoad() {
		let that = this;
		that.IMGURL = allocation.IMGROOTURL;
		that.getCollectList();
		that.globalData = app.$vm.globalData;
		that.convdate();
		user.getUserInfo().then(res => {
			that.userInfo = res;
		});
	},
	methods: {
		//房间详情页
		gotoRoomInfo(item) {
			
			let that = this;
			user.isUserinfo()
				.then(res => {
					user.getUserInfo().then(res => {
						api.getRoomType({
							gradePk: res.gradePk, //会员级别
							companyPk: allocation.COMPANYPK, //酒店主键
							roomTypePk: item.roomTypePk, //房型主键
							beginDate: that.beginDate, //开始日期
							endDate: that.endDate, //结束日期
							memPk: that.userInfo.memPk //用户主键
						}).then(res => {
							if (res.code == 1) {
								wx.hideTabBar();
								that.isRoomDetails = true;
								that.roomData = res;
								that.roomData.item = item;
								that.roomData.globalData = that.globalData;
								that.roomData.beginDate = that.beginDate;
								that.roomData.endDate = that.endDate;
							}
						});
					});
				})
				.catch(res => {
					console.log(res);
					api.getRoomType({
						gradePk: '', //会员级别
						companyPk: allocation.COMPANYPK, //酒店主键
						roomTypePk: roomTypePk, //房型主键
						beginDate: that.beginDate, //开始日期
						endDate: that.endDate, //结束日期
						memPk: that.userInfo.memPk //用户主键
					}).then(res => {
						if (res.code == 1) {
							wx.hideTabBar();
							that.isRoomDetails = true;
							that.roomData = res;
							that.roomData.globalData = that.globalData;
							that.roomData.beginDate = that.beginDate;
							that.roomData.endDate = that.endDate;
						}
					});
				});
		},
		//转换日期格式
		convdate() {
			let that = this;
			//将日期转换为2019-04-25这种格式
			if (typeof that.globalData.checkOut.month != 'string') {
				if (that.globalData.checkOut.month < 10) {
					that.globalData.checkOut.month = '0' + that.globalData.checkOut.month;
				}
			}
			if (typeof that.globalData.checkOut.day != 'string') {
				if (that.globalData.checkOut.day < 10) {
					that.globalData.checkOut.day = '0' + that.globalData.checkOut.day;
				}
			}
			if (typeof that.globalData.checkIn.month != 'string') {
				if (that.globalData.checkIn.month < 10) {
					that.globalData.checkIn.month = '0' + that.globalData.checkIn.month;
				}
			}
			if (typeof that.globalData.checkIn.day != 'string') {
				if (that.globalData.checkIn.day < 10) {
					that.globalData.checkIn.day = '0' + that.globalData.checkIn.day;
				}
			}
			that.beginDate = that.globalData.checkIn.year + '-' + that.globalData.checkIn.month + '-' + that.globalData.checkIn.day;
			that.endDate = that.globalData.checkOut.year + '-' + that.globalData.checkOut.month + '-' + that.globalData.checkOut.day;
		},
		//关闭房间详情页
		closeRoom() {
			this.isRoomDetails = false;
		},
		//获取收藏列表
		getCollectList() {
			let that = this;
			api.collectionList().then(res => {
				if (res.code == 1) {
					that.collectList = res.data;
				}
			});
		},
		//取消收藏
		collectCancel(item) {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '是否取消收藏',
				success: function(res) {
					if (res.confirm) {
						api.collectCancel({
							roomTypePk: item.roomTypePk
						}).then(res => {
							if (res.code == 1) {
								that.getCollectList();
								uni.showToast({
									title: '已取消'
								});
							}
						});
					} else if (res.cancel) {
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.collect-item {
	position: relative;
	margin: 27.17391upx;
	border-radius: 18.11594upx;
	overflow: hidden;
	box-shadow: 0 1px 2px #f1f1f1 !important;
	border: 1px solid #f1f1f1 !important;
	.collect-icon {
		width: 63.40579upx;
		height: 63.40579upx;
		position: absolute;
		z-index: 4;
		right: 36.23188upx;
		top: 36.23188upx;
	}
	.collect-img {
		width: 100%;
		height: 362.31884upx;
		border-top-left-radius: 18.11594upx;
		border-top-right-radius: 18.11594upx;
	}
	.collect-title {
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 0px 10px;
		h2 {
			flex: 1;
			font-size: 17px;
			font-weight: 500;
			margin: 11px 8px 11px 0;
		}
		p {
			color: red;
			font-size: 16px;
		}
	}
}
</style>
