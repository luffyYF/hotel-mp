<template>
	<view class="addUpPage">
		<view class="plainInvoice" v-if="showType == 'plainInvoice' ? true : false">
			<view class="UpType">
				<p>抬头类型</p>
				<view class="selType">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="enterprise" color="#cda754" :checked="upTypeName == 'enterprise' ? true : false" />
							企业
						</label>
						<label class="radio">
							<radio value="personage" color="#cda754" :checked="upTypeName == 'personage' ? true : false" />
							个人
						</label>
					</radio-group>
				</view>
			</view>
			<view class="companyName" v-if="upTypeName == 'personage' ? true : false">
				<p>*抬头名称</p>
				<input type="text" placeholder="建议填写个人姓名/店名" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="PERSON.invoiceTitle" />
			</view>
			<view class="companyName" v-if="upTypeName == 'enterprise' ? true : false">
				<p>*公司抬头</p>
				<input type="text" placeholder="请输入准确的抬头名称" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="UNIT.invoiceTitle" />
			</view>
			<view class="companyNumber" v-if="upTypeName == 'enterprise' ? true : false">
				<p>*公司税号</p>
				<input type="text" placeholder="请输入税号" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="UNIT.companyTaxNo" />
			</view>
		</view>
		<view class="specialInvoice" v-if="showType == 'specialInvoice' ? true : false">
			<view class="row">
				<p>*公司抬头</p>
				<input type="text" placeholder="请输入准确的抬头名称" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="SPECIAL.invoiceTitle" />
			</view>
			<view class="row">
				<p>*公司税号</p>
				<input type="text" placeholder="请输入税号" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="SPECIAL.companyTaxNo" />
			</view>
			<view class="row">
				<p>电话号码</p>
				<input type="text" placeholder="请输入单位电话号码" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="SPECIAL.invoiceCompanyPhone" />
			</view>
			<view class="row">
				<p>单位地址</p>
				<input type="text" placeholder="单位注册地址信息" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="SPECIAL.invoiceCompanyAddress" />
			</view>
			<view class="row">
				<p>开户银行</p>
				<input type="text" placeholder="单位的开户行名称" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="SPECIAL.openingBank" />
			</view>
			<view class="row">
				<p>银行账号</p>
				<input type="text" placeholder="单位的银行账号" placeholder-style="color:#999;font-size:27.17391upx" value="" v-model="SPECIAL.openingAccount" />
			</view>
		</view>

		<view class="operationBtn">
			<button @tap="saveUse">保存并使用</button>
			<button @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
import api from '@/utils/api.js';
import user from '@/services/user.js';
export default {
	data() {
		return {
			upTypeName: 'personage',
			showType: '',
			userInfo: {},
			//个人抬头
			PERSON: {
				invoiceTitle: ''
			},
			//企业抬头
			UNIT: {
				invoiceTitle: '',
				companyTaxNo: ''
			},
			//专用抬头
			SPECIAL: {
				invoiceTitle: '',
				companyTaxNo: '',
				invoiceCompanyPhone: '',
				invoiceCompanyAddress: '',
				openingBank: '',
				openingAccount: ''
			}
		};
	},
	onLoad(opt) {
		let that = this;
		if (opt.showType == 'plainInvoice') {
			that.showType = 'plainInvoice';
			if (opt.hasOwnProperty('obj')) {
				if (JSON.parse(opt.obj).saveType == 'PERSON') {
					that.upTypeName = 'personage';
					that.PERSON.invoiceTitle = JSON.parse(opt.obj).invoiceTitle;
				}
				if (JSON.parse(opt.obj).saveType == 'UNIT') {
					that.upTypeName = 'enterprise';
					that.UNIT.invoiceTitle = JSON.parse(opt.obj).invoiceTitle;
					that.UNIT.companyTaxNo = JSON.parse(opt.obj).companyTaxNo;
				}
			}
		} else if (opt.showType == 'specialInvoice') {
			that.showType = 'specialInvoice';
			if (opt.hasOwnProperty('obj')) {
				if (JSON.parse(opt.obj).saveType == 'SPECIAL') {
					that.SPECIAL.invoiceTitle = JSON.parse(opt.obj).invoiceTitle;
					that.SPECIAL.companyTaxNo = JSON.parse(opt.obj).companyTaxNo;
					that.SPECIAL.invoiceCompanyPhone = JSON.parse(opt.obj).invoiceCompanyPhone;
					that.SPECIAL.invoiceCompanyAddress = JSON.parse(opt.obj).invoiceCompanyAddress;
					that.SPECIAL.openingBank = JSON.parse(opt.obj).openingBank;
					that.SPECIAL.openingAccount = JSON.parse(opt.obj).openingAccount;
				}
			}
		}
		/* console.log(opt);
		console.log(JSON.parse(opt.obj)); */
		user.getUserInfo().then(res => {
			that.userInfo = res;
		});
	},
	onShow() {},
	methods: {
		//选择抬头类型
		radioChange(e) {
			this.upTypeName = e.target.value;
		},
		//保存信息
		save() {
			let that = this;
			if (that.showType == 'plainInvoice') {
				if (that.upTypeName == 'enterprise') {
					for (var i in that.UNIT) {
						if (that.UNIT[i] != '') {
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
						saveType: 'UNIT',
						invoiceTitle: that.UNIT.invoiceTitle,
						companyTaxNo: that.UNIT.companyTaxNo,
						memPk: that.userInfo.memPk
					}).then(res => {
						if (res.code == 1) {
							/* console.log(that.UNIT); */
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
				} else if (that.upTypeName == 'personage') {
					for (var i in that.PERSON) {
						if (that.PERSON[i] != '') {
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
						saveType: 'PERSON',
						invoiceTitle: that.PERSON.invoiceTitle,
						memPk: that.userInfo.memPk
					}).then(res => {
						if (res.code == 1) {
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
			} else if (that.showType == 'specialInvoice') {
				for (var i in that.SPECIAL) {
					if (that.SPECIAL['invoiceTitle'] == '') {
						uni.showToast({
							title: '带*号的为必填项 ',
							image: '../../static/images/order/icon/shibai.png'
						});
						return;
					} else if (that.SPECIAL['companyTaxNo'] == '') {
						uni.showToast({
							title: '带*号的为必填项 ',
							image: '../../static/images/order/icon/shibai.png'
						});
						return;
					} else {
						continue;
					}
				}
				api.invoiceSave({
					saveType: 'UNIT',
					invoiceTitle: that.SPECIAL.invoiceTitle,
					companyTaxNo: that.SPECIAL.companyTaxNo,
					invoiceCompanyPhone: that.SPECIAL.invoiceCompanyPhone,
					invoiceCompanyAddress: that.SPECIAL.invoiceCompanyAddress,
					openingBank: that.SPECIAL.openingBank,
					openingAccount: that.SPECIAL.openingAccount,
					memPk: that.userInfo.memPk
				}).then(res => {
					if (res.code == 1) {
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
		},
		//保存并使用
		saveUse() {
			let that = this;
			if (that.showType == 'plainInvoice') {
				if (that.upTypeName == 'enterprise') {
					for (var i in that.UNIT) {
						if (that.UNIT[i] != '') {
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
						saveType: 'UNIT',
						invoiceTitle: that.UNIT.invoiceTitle,
						companyTaxNo: that.UNIT.companyTaxNo,
						memPk: that.userInfo.memPk
					}).then(res => {
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: '保存成功'
							});
							var pages = getCurrentPages();
							var currPage = pages[pages.length - 1]; //当前页面
							var prevPage = pages[pages.length - 2]; //上一个页面
							var obj = {
								saveType: 'UNIT',
								invoiceTitle: that.UNIT.invoiceTitle,
								companyTaxNo: that.UNIT.companyTaxNo
							};
							//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							prevPage.setData({
								saveUp: obj
							});
							uni.navigateBack();
						} else {
							uni.showToast({
								title: '保存失败',
								image: '../../static/images/order/icon/shibai.png'
							});
						}
					});
				} else if (that.upTypeName == 'personage') {
					for (var i in that.PERSON) {
						if (that.PERSON[i] != '') {
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
						saveType: 'PERSON',
						invoiceTitle: that.PERSON.invoiceTitle,
						memPk: that.userInfo.memPk
					}).then(res => {
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: '保存成功'
							});
							var pages = getCurrentPages();
							var currPage = pages[pages.length - 1]; //当前页面
							var prevPage = pages[pages.length - 2]; //上一个页面
							var obj = {
								saveType: 'PERSON',
								invoiceTitle: that.PERSON.invoiceTitle
							};
							//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							prevPage.setData({
								saveUp: obj
							});
							uni.navigateBack();
						} else {
							uni.showToast({
								title: '保存失败',
								image: '../../static/images/order/icon/shibai.png'
							});
						}
					});
				}
			} else if (that.showType == 'specialInvoice') {
				for (var i in that.SPECIAL) {
					if (that.SPECIAL[i] != '') {
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
					saveType: 'UNIT',
					invoiceTitle: that.SPECIAL.invoiceTitle,
					companyTaxNo: that.SPECIAL.companyTaxNo,
					invoiceCompanyPhone: that.SPECIAL.invoiceCompanyPhone,
					invoiceCompanyAddress: that.SPECIAL.invoiceCompanyAddress,
					openingBank: that.SPECIAL.openingBank,
					openingAccount: that.SPECIAL.openingAccount,
					memPk: that.userInfo.memPk
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						});
						var pages = getCurrentPages();
						var currPage = pages[pages.length - 1]; //当前页面
						var prevPage = pages[pages.length - 2]; //上一个页面
						var obj = {
							saveType: 'UNIT',
							invoiceTitle: that.SPECIAL.invoiceTitle,
							companyTaxNo: that.SPECIAL.companyTaxNo,
							invoiceCompanyPhone: that.SPECIAL.invoiceCompanyPhone,
							invoiceCompanyAddress: that.SPECIAL.invoiceCompanyAddress,
							openingBank: that.SPECIAL.openingBank,
							openingAccount: that.SPECIAL.openingAccount
						};
						//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
						prevPage.setData({
							saveUp: obj
						});
						uni.navigateBack();
					} else {
						uni.showToast({
							title: '保存失败',
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
.addUpPage {
	.plainInvoice {
		.UpType,
		.companyName,
		.companyNumber {
			display: flex;
			vertical-align: middle;
			align-items: center;
			padding: 27.17391upx 0;
			margin: 0 27.17391upx;
			border-bottom: 1px solid #f5f9fc;
			p {
				flex: 1;
				font-size: 27.17391upx;
			}
			.selType {
				display: flex;
				vertical-align: middle;
				align-items: center;
				.radio {
					margin-right: 18.11594upx;
					font-size: 27.17391upx;
				}
			}
		}
	}
	.specialInvoice {
		.row {
			display: flex;
			vertical-align: middle;
			align-items: center;
			padding: 27.17391upx 0;
			margin: 0 27.17391upx;
			border-bottom: 1px solid #f5f9fc;
			p {
				flex: 0.4;
				font-size: 27.17391upx;
			}
			.selType {
				display: flex;
				vertical-align: middle;
				align-items: center;
				.radio {
					margin-right: 18.11594upx;
					font-size: 27.17391upx;
				}
			}
		}
	}
	.operationBtn {
		button {
			font-size: 27.17391upx;
			color: white;
			background-color:#cda754;
			margin: 36.23188upx;
		}
	}
}
</style>
