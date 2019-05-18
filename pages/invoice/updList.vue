<template>
	<view v-cloak>
		<scroll-view scroll-y class="content">
			<uni-swipe-action :options="options" @click="delItem(item)" v-for="(item, index) in upAddress.ADDRESS" :key="index" v-if="showType == 'ADDRESS'">
				<view class="address-item">
					<view style="flex:1;" @tap="useUp(item.saveType, item)">
						<p style="font-size: 25.36231upx;">
							<span style="margin-right: 18.11594upx;">{{ item.receiveName }}</span>
							<span>{{ item.receivePhone }}</span>
						</p>
						<p style="font-size: 25.36231upx;">{{ item.receiveAddress + item.addressNumber }}</p>
					</view>
					<p style="color:#cda754;text-align: center;"><span @tap="updUp(item.saveType, item)">编辑</span></p>
				</view>
			</uni-swipe-action>
			<uni-swipe-action
				:options="options"
				@click="delItem(item)"
				v-for="(item, index) in upAddress.PERSON"
				:key="index"
				v-if="showType == 'UP' ? true : showType == 'PERSON' || showType == 'UNIT'"
			>
				<view class="cont">
					<view class="up-item ">
						<view style="flex: 1" @tap="useUp(item.saveType, item)">
							<p>个人:{{ item.invoiceTitle }}</p>
						</view>
						<p style="color: #cda754;text-align: center;"><span style="margin-right: 9.05797upx;" @tap="updUp(item.saveType, item)">编辑</span></p>
					</view>
				</view>
			</uni-swipe-action>
			<!-- <uni-swipe-action v-for="(item, index) in upAddress.PERSON" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'" options="options">
				
			</uni-swipe-action> -->
			<uni-swipe-action
				:options="options"
				@click="delItem(item)"
				v-for="(item, index) in upAddress.UNIT"
				:key="index"
				v-if="showType == 'UP' ? true : showType == 'PERSON' || showType == 'UNIT'"
			>
				<view class="up-item">
					<view style="flex: 1" @tap="useUp(item.saveType, item)">
						<p>企业:{{ item.invoiceTitle }}</p>
						<p style="color: #666666;">税号：{{ item.companyTaxNo }}</p>
					</view>
					<p style="color: #cda754;text-align: center;">
						<span style="margin-right: 9.05797upx;" @tap="updUp(item.saveType, item)">{{ item.isPerfectFlag ? '编辑' : '不完善' }}</span>
					</p>
				</view>
			</uni-swipe-action>
		</scroll-view>
		<view class="operationBtn" style="border-top: 1px solid #f5f9fc;background-color: white; position: fixed;bottom: 0;width: 100%;" @tap="addPage(showType)">
			<button>{{ showType == 'ADDRESS' ? '新增地址' : '添加抬头' }}</button>
		</view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import user from '@/services/user.js';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';

export default {
	components: { uniSwipeAction },
	data() {
		return {
			userInfo: {},
			upAddress: {},
			invoiceInfo: {},
			showType: '',
			typeName: '',
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	onLoad(opt) {
		let that = this;
		if (opt.showType == 'UP') {
			that.showType = 'UP';
		} else {
			that.showType = opt.showType;
			that.typeName = opt.typeName;
		}
	},
	onShow() {
		let that = this;
		let flag = that.showType;
		that.getList(flag);
	},
	methods: {
		//是否完善
		isPerfectFlag(item) {
			if (this.typeName == 'specialInvoice') {
				
				if (item.invoiceTitle == '' || item.invoiceTitle == null) {
					item.isPerfectFlag = false;
					return item;
				} else {
					item.isPerfectFlag = true;
				}
				if (item.companyTaxNo == '' || item.companyTaxNo == null) {
					item.isPerfectFlag = false;
					return item;
				} else {
					item.isPerfectFlag = true;
				}
				if (item.invoiceCompanyPhone == '' || item.invoiceCompanyPhone == null) {
					item.isPerfectFlag = false;
					return item;
				} else {
					item.isPerfectFlag = true;
				}
				if (item.invoiceCompanyAddress == '' || item.invoiceCompanyAddress == null) {
					item.isPerfectFlag = false;
					return item;
				} else {
					item.isPerfectFlag = true;
				}
				if (item.openingBank == '' || item.openingBank == null) {
					item.isPerfectFlag = false;
					return item;
				} else {
					item.isPerfectFlag = true;
				}
				if (item.openingAccount == '' || item.openingAccount == null) {
					item.isPerfectFlag = false;
				} else {
					item.isPerfectFlag = true;
					
				}
				return item;
			}else{
				
				item.isPerfectFlag = true;
				return item;
			}
		},
		//获取数据
		getList(flag) {
			let that = this;
			if (flag == 'PERSON') {
				let obj = {};
				api.invoiceList({
					saveType: 'PERSON'
				}).then(res => {
					obj.PERSON = res.data.PERSON;
					api.invoiceList({
						saveType: 'UNIT'
					}).then(res => {
						if (res.code == 1) {
							obj.UNIT = res.data.UNIT;
							for (var i = 0; i < obj.UNIT.length; i++) {
								obj.UNIT[i] = that.isPerfectFlag(obj.UNIT[i]);
							}
							that.upAddress = obj;
							if (obj.PERSON == undefined && obj.UNIT == undefined) {
								console.log('没数据');
							}
						}
					});
				});
			} else if (flag == 'UNIT') {
				let obj = {};
				api.invoiceList({
					saveType: 'UNIT'
				}).then(res => {
					if (res.code == 1) {
						obj.UNIT = res.data.UNIT;
						for (var i = 0; i < obj.UNIT.length; i++) {
							obj.UNIT[i] = that.isPerfectFlag(obj.UNIT[i]);
						}
						that.upAddress = obj;
						if (obj.UNIT == undefined) {
							console.log('没数据');
						}
					}
				});
			} else if (flag == 'ADDRESS') {
				let obj = {};
				api.invoiceList({
					saveType: 'ADDRESS'
				}).then(res => {
					if (res.code == 1) {
						obj.ADDRESS = res.data.ADDRESS;
						that.upAddress = obj;
						if (obj.ADDRESS == undefined) {
							console.log('没数据');
						}
					}
				});
			} else if (flag == 'UP') {
				let obj = {};
				api.invoiceList({
					saveType: 'PERSON'
				}).then(res => {
					obj.PERSON = res.data.PERSON;
					api.invoiceList({
						saveType: 'UNIT'
					}).then(res => {
						if (res.code == 1) {
							obj.UNIT = res.data.UNIT;
							for (var i = 0; i < obj.UNIT.length; i++) {
								obj.UNIT[i] = that.isPerfectFlag(obj.UNIT[i]);
							}
							that.upAddress = obj;
							if (obj.PERSON == undefined && obj.UNIT == undefined) {
								console.log('没数据');
							}
						}
					});
				});
			}
		},
		//删除选项
		delItem(item) {
			let that = this;
			api.delInvoice({
				invoicePk: item.invoicePk
			}).then(res => {
				if (res.code == 1) {
					uni.showToast({
						icon: 'none',
						title: '删除成功'
					});
					that.getList(that.showType);
				}
			});
		},
		//修改
		updUp(flag, obj) {
			let that = this;
			if (that.showType == 'UP') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'plainInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else {
				if (flag == 'UNIT') {
					uni.navigateTo({
						url: 'updUp?showType=' + that.typeName + '&obj=' + JSON.stringify(obj)
					});
				} else if (flag == 'PERSON') {
					uni.navigateTo({
						url: 'updUp?showType=' + that.typeName + '&obj=' + JSON.stringify(obj)
					});
				} else if (flag == 'ADDRESS') {
					uni.navigateTo({
						url: 'addAddress?obj=' + JSON.stringify(obj) + '&&showType=upd'
					});
				}
			}
		},
		//跳转到添加页面
		addPage(flag) {
			let that = this;
			let typeName = that.typeName;

			if (flag == 'ADDRESS') {
				uni.navigateTo({
					url: 'addAddress?showType=add'
				});
			} else if (flag == 'UP') {
				uni.navigateTo({
					url: 'addUp?showType=' + 'plainInvoice'
				});
			} else {
				uni.navigateTo({
					url: 'addUp?showType=' + typeName
				});
			}
		},
		//使用抬头
		useUp(flag, obj) {
			let that = this;
			let typeName = that.typeName;
			if (flag == 'UNIT') {
				if (typeName == 'specialInvoice') {
					if (!obj.isPerfectFlag) {
						uni.navigateTo({
							url: 'updUp?showType=' + 'specialInvoice' + '&obj=' + JSON.stringify(obj)
						});
					} else {
						that.invoiceInfo.saveType = 'UNIT';
						that.invoiceInfo.riseType = 2;
						that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
						that.invoiceInfo.companyTaxNo = obj.companyTaxNo;
						that.invoiceInfo.invoiceCompanyPhone = obj.invoiceCompanyPhone;
						that.invoiceInfo.invoiceCompanyAddress = obj.invoiceCompanyAddress;
						that.invoiceInfo.openingBank = obj.openingBank;
						that.invoiceInfo.openingAccount = obj.openingAccount;

						var pages = getCurrentPages();
						var currPage = pages[pages.length - 1]; //当前页面
						var prevPage = pages[pages.length - 2]; //上一个页面
						//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
						prevPage.setData({
							saveUp: that.invoiceInfo
						});
						uni.navigateBack();
					}
				} else {
					that.invoiceInfo.saveType = 'UNIT';
					that.invoiceInfo.riseType = 2;
					that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
					that.invoiceInfo.companyTaxNo = obj.companyTaxNo;
					/* that.invoiceInfo.invoiceCompanyPhone = obj.invoiceCompanyPhone;
					that.invoiceInfo.invoiceCompanyAddress = obj.invoiceCompanyAddress;
					that.invoiceInfo.openingBank = obj.openingBank;
					that.invoiceInfo.openingAccount = obj.openingAccount; */
					var pages = getCurrentPages();
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面
					//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
					prevPage.setData({
						saveUp: that.invoiceInfo
					});
					uni.navigateBack();
				}
			} else if (flag == 'PERSON') {
				that.invoiceInfo.saveType = 'PERSON';
				that.invoiceInfo.riseType = 1;
				that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
				that.invoiceInfo.companyTaxNo = '';
				that.invoiceInfo.invoiceCompanyPhone = '';
				that.invoiceInfo.invoiceCompanyAddress = '';
				that.invoiceInfo.openingBank = '';
				that.invoiceInfo.openingAccount = '';
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					saveUp: that.invoiceInfo
				});
				uni.navigateBack();
			} else if (flag == 'ADDRESS') {
				that.invoiceInfo.saveType = 'ADDRESS';
				that.invoiceInfo.receiveAddress = obj.receiveAddress + obj.addressNumber;
				that.invoiceInfo.receiveName = obj.receiveName;
				that.invoiceInfo.receivePhone = obj.receivePhone;
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					saveUp: that.invoiceInfo
				});
				uni.navigateBack();
			}
		}
	}
};
</script>

<style lang="scss">
[v-cloak] {
	display: none;
}
.content {
	.up-item {
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 27.17391upx 18.11594upx;
		border-bottom: 1px solid #f5f9fc;
	}
	.address-item {
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 18.11594upx;
		border-bottom: 1px solid #f5f9fc;
	}
}
.operationBtn {
	button {
		font-size: 27.17391upx;
		color: white;
		background-color: #cda754;
		margin: 36.23188upx;
	}
}
</style>
