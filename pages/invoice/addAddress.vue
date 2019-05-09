<template>
	<view class="addAddress">
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
					<radio value="M" checked="" color="#DD524D" />
					先生
				</label>
				<label class="radio">
					<radio value="W" checked="" color="#DD524D" />
					女士
				</label>
			</radio-group>
		</view>
		<view class="row">
			<p>*手机号：</p>
			<input type="text" placeholder="请填写收货手机号" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="addressDetails.receivePhone" />
		</view>
		<button @tap="saveAddress" style="margin:90.57971upx 36.23188upx 0 36.23188upx;font-size: 27.17391upx;padding: 18.11594upx 0;background-color: #DD524D;color: white;">
			保存地址
		</button>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import user from '@/services/user.js';
export default {
	data() {
		return {
			userInfo:{},
			addressDetails: {
				receiveAddress: '',
				addressNumber: '',
				receiveName: '',
				memSex: 'W',
				receivePhone: ''
			}
		};
	},
	onLoad(opt) {
		let that=this
		if (JSON.parse(opt.obj).saveType == 'ADDRESS') {
			that.addressDetails.receiveAddress = JSON.parse(opt.obj).receiveAddress ;
			that.addressDetails.addressNumber = JSON.parse(opt.obj).addressNumber;
			that.addressDetails.receiveName = JSON.parse(opt.obj).receiveName;
			that.addressDetails.receivePhone = JSON.parse(opt.obj).receivePhone;
		}
		user.getUserInfo().then(res=>{
			that.userInfo=res
		})
	},
	methods: {
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
			api.invoiceSave({
				receiveAddress: that.addressDetails.receiveAddress,
				addressNumber: that.addressDetails.addressNumber,
				receiveName: that.addressDetails.receiveName,
				memSex: that.addressDetails.memSex,
				receivePhone: that.addressDetails.receivePhone,
				memPk:that.userInfo.memPk,
				saveType: 'ADDRESS'
			}).then(res => {
				if (res.code == 1) {
					uni.showToast({
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
		}
	}
}
</style>
