<template>
	<view>
		<view style="margin:36.23188upx 0;border-bottom: 1px solid #f5f9fc;" @tap="addPage(showType)">
			<button style="font-size:25.36231upx;background-color: white;border: 1px solid #666666;color: #666666;margin: 0 18.11594upx;">
				{{ showType == 'ADDRESS' ? '新增地址' : '添加抬头' }}
			</button>
		</view>
		<scroll-view scroll-y class="content">
			<uni-swipe-action :options="options" @click="delItem(item)" v-for="(item, index) in upAddress.ADDRESS" :key="index" v-if="showType == 'ADDRESS'">
				<view class="address-item">
					<view style="flex:0.8;">
						<p style="font-size: 25.36231upx;">
							<span style="margin-right: 18.11594upx;">{{ item.receiveName }}</span>
							<span>{{ item.receivePhone }}</span>
						</p>
						<p style="font-size: 25.36231upx;">{{ item.receiveAddress + item.addressNumber }}</p>
					</view>
					<p style="color: #0A98D5;flex: 0.2;text-align: center;">
						<span @tap="updUp(item.saveType, item)">编辑</span>
						<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span>
					</p>
				</view>
			</uni-swipe-action>
			<uni-swipe-action :options="options" @click="delItem(item)" v-for="(item, index) in upAddress.PERSON" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'">
				<view class="cont">
					<view class="up-item ">
						<view style="flex: 0.8;">
							<p>个人:{{ item.invoiceTitle }}</p>
						</view>
						<p style="color: #0A98D5;flex: 0.2;text-align: center;">
							<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">编辑</span>
							<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span>
						</p>
					</view>
				</view>
			</uni-swipe-action>
			<!-- <uni-swipe-action v-for="(item, index) in upAddress.PERSON" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'" options="options">
				
			</uni-swipe-action> -->
			<uni-swipe-action :options="options" @click="delItem(item)" v-for="(item, index) in upAddress.UNIT" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'">
				<view class="up-item">
					<view style="flex: 0.8;">
						<p>企业:{{ item.invoiceTitle }}</p>
						<p style="color: #666666;">税号：{{ item.companyTaxNo }}</p>
					</view>
					<p style="color: #0A98D5;flex: 0.2;text-align: center;">
						<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">
							{{ showType == 'UNIT' ? (item.openingAccount == null || item.openingAccount == '' ? '不完善' : '编辑') : '编辑' }}
						</span>
						<span
							style="margin-right: 9.05797upx;"
							@tap="useUp(item.saveType, item)"
							v-if="showType == 'UNIT' ? (item.openingAccount == null || item.openingAccount == '' ? false : true) : true"
						>
							使用
						</span>
					</p>
				</view>
			</uni-swipe-action>
		</scroll-view>
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
		that.showType = opt.showType;
		that.typeName = opt.typeName;
	},
	onShow() {
		let that = this;

		let flag = that.showType;
		that.getList(flag);
	},
	methods: {
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
						title: '删除成功'
					});
					that.getList(that.showType);
				}
			});
		},
		//修改
		updUp(flag, obj) {
			let that = this;
			console.log(obj);

			if (flag == 'UNIT') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'specialInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'PERSON') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'plainInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'ADDRESS') {
				uni.navigateTo({
					url: 'addAddress?obj=' + JSON.stringify(obj)
				});
			}
		},
		//跳转到添加页面
		addPage(flag) {
			let that = this;
			let typeName = that.typeName;

			if (flag == 'ADDRESS') {
				uni.navigateTo({
					url: 'addAddress'
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

			let typeName;
			if (that.options == 1) {
				typeName = 'plainInvoice';
			} else if (that.options == 2) {
				typeName = 'specialInvoice';
			} else {
				return;
			}

			if (flag == 'UNIT') {
				if (typeName == 'specialInvoice') {
					if (obj.openingAccount == null || obj.openingAccount == '') {
						uni.navigateTo({
							url: 'updUp?showType=' + 'specialInvoice' + '&obj=' + JSON.stringify(obj)
						});
					} else {
						that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
						that.invoiceInfo.companyTaxNo = obj.companyTaxNo;
						that.invoiceInfo.invoiceCompanyPhone = obj.invoiceCompanyPhone;
						that.invoiceInfo.invoiceCompanyAddress = obj.invoiceCompanyAddress;
						that.invoiceInfo.openingBank = obj.openingBank;
						that.invoiceInfo.openingAccount = obj.openingAccount;
						that.invoiceInfo.riseType = 2;
					}
				} else {
					that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
					that.invoiceInfo.companyTaxNo = obj.companyTaxNo;
					/* that.invoiceInfo.invoiceCompanyPhone = obj.invoiceCompanyPhone;
					that.invoiceInfo.invoiceCompanyAddress = obj.invoiceCompanyAddress;
					that.invoiceInfo.openingBank = obj.openingBank;
					that.invoiceInfo.openingAccount = obj.openingAccount; */
					that.invoiceInfo.riseType = 2;
				}
			} else if (flag == 'PERSON') {
				that.invoiceInfo.riseType = 1;
				that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
				that.invoiceInfo.companyTaxNo = '';
				that.invoiceInfo.invoiceCompanyPhone = '';
				that.invoiceInfo.invoiceCompanyAddress = '';
				that.invoiceInfo.openingBank = '';
				that.invoiceInfo.openingAccount = '';
			} else if (flag == 'ADDRESS') {
				that.invoiceInfo.receiveAddress = obj.receiveAddress + obj.addressNumber;
				that.invoiceInfo.receiveName = obj.receiveName;
				that.invoiceInfo.receivePhone = obj.receivePhone;
			}

			that.closeWindows();
		}
	}
};
</script>

<style lang="scss">
.content {
	.up-item {
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 27.17391upx 18.11594upx;
	}
	.address-item {
		display: flex;
		vertical-align: middle;
		align-items: center;
		padding: 18.11594upx;
		border-bottom: 1px solid #f5f9fc;
	}
}
</style>
