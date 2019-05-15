<template>
	<view>
		<view class="updList">
			<view class="upList">
				<view class="up-item" v-for="(item, index) in invoiceList.PERSON" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'">
					<view style="flex: 0.8;">
						<p>个人:{{ item.invoiceTitle }}</p>
					</view>
					<p style="color: #0A98D5;flex: 0.2;text-align: center;"><span @tap="updUp(item.saveType, item)">编辑</span></p>
				</view>
				<view class="up-item" v-for="(item, index) in invoiceList.UNIT" :key="index" v-if="showType == 'UNIT' || showType == 'PERSON'">
					<view style="flex: 0.8;">
						<p>企业:{{ item.invoiceTitle }}</p>
						<p style="color: #666666;">税号：{{ item.companyTaxNo }}</p>
					</view>
					<p style="color: #0A98D5;flex: 0.2;text-align: center;"><span @tap="updUp(item.saveType, item)">编辑</span></p>
				</view>
				<view class="up-item" v-for="(item, index) in invoiceList.SPECIAL" :key="index" v-if="showType == 'SPECIAL'">
					<view style="flex: 0.8;">
						<p>专用:{{ item.invoiceTitle }}</p>
						<p style="color: #666666;">税号：{{ item.companyTaxNo }}</p>
					</view>
					<p style="color: #0A98D5;flex: 0.2;text-align: center;"><span @tap="updUp(item.saveType, item)">编辑</span></p>
				</view>
			</view>
			<view class="addressList">
				<view class="address-item" v-for="(item, index) in invoiceList.ADDRESS" v-if="showType == 'ADDRESS'" :key="index">
					<view style="flex:0.8;">
						<p style="">
							<span style="margin-right: 18.11594upx;">{{ item.receiveName }}</span>
							<span>{{ item.receivePhone }}</span>
						</p>
						<p style="">{{ item.receiveAddress + item.addressNumber }}</p>
					</view>
					<p style="color: #0A98D5;flex: 0.2;text-align: center;"><span @tap="updUp(item.saveType, item)">编辑</span></p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import user from '@/services/user.js';
export default {
	data() {
		return {
			userInfo: {},
			invoiceList: {},
			showType: ''
		};
	},
	onLoad(opt) {
		let that = this;
		that.showType = opt.showType;
		user.getUserInfo().then(res => {
			that.userInfo = res;
		});
		api.invoiceList({
			memPk: that.userInfo.memPk
		}).then(res => {
			if (res.code == 1) {
				that.invoiceList = res.data;
			}
		});
	},
	onShow() {
		let that = this;
		api.invoiceList({
			memPk: that.userInfo.memPk
		}).then(res => {
			if (res.code == 1) {
				that.invoiceList = res.data;
			}
		});
	},
	methods: {
		updUp(flag, obj) {
			let that = this;
			console.log(obj);

			if (flag == 'UNIT') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'plainInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'PERSON') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'plainInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'SPECIAL') {
				uni.navigateTo({
					url: 'updUp?showType=' + 'specialInvoice' + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'ADDRESS') {
				uni.navigateTo({
					url: 'addAddress?obj=' + JSON.stringify(obj)
				});
			}
		}
	}
};
</script>

<style lang="scss">
.updList {
	.upList {
		.up-item {
			display: flex;
			vertical-align: middle;
			align-items: center;
			padding: 27.17391upx 18.11594upx;
			border-bottom: 1px solid #f5f9fc;
		}
	}
	.addressList {
		.address-item {
			display: flex;
			vertical-align: middle;
			align-items: center;
			padding: 18.11594upx;
			border-bottom: 1px solid #f5f9fc;
		}
	}
}
</style>
