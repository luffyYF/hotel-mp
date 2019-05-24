<template>
	<view class="addAddress">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="收货地址"></uni-nav-bar>
		<view class="row">
			<p>*收货地址：</p>
			<input type="text" placeholder="请填写收货地址" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="addressDetails.receiveAddress" />
		</view>
		<view class="row">
			<p>*门牌号：</p>
			<input type="text" placeholder="详细地址,例:16号楼5层501室" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="addressDetails.addressNumber" />
		</view>
		<view class="row">
			<p>*联系人：</p>
			<input type="text" placeholder="请填写收货人的姓名" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="addressDetails.receiveName" />
		</view>
		<view style="text-align: center;" class="row">
			<radio-group @change="radioChange">
				<label class="radio">
					<radio value="M" :checked="addressDetails.memSex == 'M' ? true : false" color="#cda754" />
					先生
				</label>
				<label class="radio">
					<radio value="W" :checked="addressDetails.memSex == 'W' ? true : false" color="#cda754" />
					女士
				</label>
			</radio-group>
		</view>
		<view class="row">
			<p>*手机号：</p>
			<input type="text" placeholder="请填写收货手机号" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="addressDetails.receivePhone" />
		</view>
		<button @tap="saveAddress()" style="margin:90.57971upx 36.23188upx 0 36.23188upx;font-size: 27.17391upx;background-color: #cda754;color: white;">
			{{ showType == 'add' ? '保存地址' : '修改地址' }}
		</button>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import user from '@/services/user.js';
export default {
	data() {
		return {
			userInfo: {},
			invoicePk: '',
			addressDetails: {
				receiveAddress: '',
				addressNumber: '',
				receiveName: '',
				memSex: '',
				receivePhone: ''
			},
			//是否修改
			showType: ''
		};
	},
	onLoad(opt) {
		let that = this;
		if (opt.hasOwnProperty('showType')) {
			if (opt.showType == 'upd') {
				that.showType = 'upd';
				if (opt.hasOwnProperty('obj')) {
					if (JSON.parse(opt.obj).saveType == 'ADDRESS') {
						that.invoicePk = JSON.parse(opt.obj).invoicePk;
						that.addressDetails.receiveAddress = JSON.parse(opt.obj).receiveAddress;
						that.addressDetails.addressNumber = JSON.parse(opt.obj).addressNumber;
						that.addressDetails.receiveName = JSON.parse(opt.obj).receiveName;
						that.addressDetails.receivePhone = JSON.parse(opt.obj).receivePhone;
						that.addressDetails.memSex = JSON.parse(opt.obj).memSex;
					}
				}
			}
			if (opt.showType == 'add') {
				that.showType = 'add';
			}
		}
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		//选择性别
		radioChange(e) {
			this.addressDetails.memSex = e.target.value;
		},
		saveAddress() {
			let that = this;

			for (var i in that.addressDetails) {
				if (that.addressDetails[i] != '') {
					continue;
				} else {
					uni.showToast({
						title: '带*号的为必填项 ',
						image: '../../static/images/order/icon/shibai.png'
					});
					return;
				}
			}

			if (that.showType == 'add') {
				api.invoiceSave({
					receiveAddress: that.addressDetails.receiveAddress,
					addressNumber: that.addressDetails.addressNumber,
					receiveName: that.addressDetails.receiveName,
					memSex: that.addressDetails.memSex,
					receivePhone: that.addressDetails.receivePhone,
					saveType: 'ADDRESS'
				}).then(res => {
					if (res.code == 1) {
						uni.navigateBack({
							delta: 1
						});
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						});
					} else {
						uni.showToast({
							title: '保存失败',
							image: '../../static/images/order/icon/shibai.png'
						});
					}
				});
			}
			if (that.showType == 'upd') {
				api.invoiceUpd({
					invoicePk: that.invoicePk,
					saveType: 'ADDRESS',
					receiveAddress: that.addressDetails.receiveAddress,
					addressNumber: that.addressDetails.addressNumber,
					receiveName: that.addressDetails.receiveName,
					memSex: that.addressDetails.memSex,
					receivePhone: that.addressDetails.receivePhone
				}).then(res => {
					if (res.code == 1) {
						uni.navigateBack({
							delta: 1
						});
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						});
					} else {
						uni.showToast({
							title: '修改失败',
							image: '../../static/images/order/icon/shibai.png'
						});
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.addAddress {
	.row {
		margin: 0 18.11594upx;
		padding: 18.11594upx 0;
		display: flex;
		vertical-align: middle;
		align-items: center;
		border-bottom: 1px solid #f5f9fc;
		p {
			flex: 0.4;
		}
		input {
			flex: 1;
		}
	}
}
</style>
