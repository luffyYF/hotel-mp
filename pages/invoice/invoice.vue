<template>
	<view>
		<scroll-view class="invoicePage">
			<view class="whetherNeed">
				<p style="font-size: 32.60869upx;">需要发票</p>
				<switch :checked="whetherNeed" @change="Need" />
			</view>
			<view class="invoiceContent" v-if="whetherNeed">
				<view class="invoiceType">
					<view class="options">
						<!-- <view class="single" :class="options == 1 ? 'active' : ''" @tap="selType(1)"><p>不需要发票</p></view> -->
						<view class="single" :class="invoiceTypes[0] == 1 ? (options == 1 ? 'active' : '') : 'no-active'" @tap="invoiceTypes[0] == 1 ? selType(1) : ''">
							<p>
								普通发票（电子）
								<span style="display: block; font-size: 21.73913upx;">发至您的邮箱</span>
							</p>
						</view>
						<view class="single" :class="invoiceTypes[2] == 2 ? (options == 2 ? 'active' : '') : 'no-active'" @tap="invoiceTypes[2] == 2 ? selType(2) : ''">
							<p>
								专用发票（纸质）
								<span style="display: block; font-size: 21.73913upx;">注：如需邮寄，邮费到付</span>
							</p>
						</view>
					</view>
				</view>
				<view class="invoiceDetails">
					<view class="invoiceExplain">
						<p class="explainTitle">开票说明</p>
						<ul class="explain-ul">
							<li class="e-li">
								<p>
									<span style="color:#DD524D;">代理商开票,离开后4个工作日</span>
									内发送至邮箱
								</p>
							</li>
							<li class="e-li">
								<p>
									开票城市为
									<span style="color:#DD524D;">珠海市</span>
									,可能与您入住酒店城市不一致,您可选择在发票上备注酒店名称及入离日期
								</p>
							</li>
						</ul>
					</view>
					<view class="invoiceTitle" v-if="options == 1 ? true : false" @tap="gotoAddUp('UNIT')">
						<p>*发票抬头</p>
						<p style="flex: 1;font-size:28.9855upx;color: #000000;">
							{{ invoiceInfo.invoiceTitle == '' ? '请添加抬头信息' : invoiceInfo.invoiceTitle }}
							<br />
							{{ invoiceInfo.companyTaxNo == '' ? '' : '税号:' + invoiceInfo.companyTaxNo }}
						</p>

						<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
					<view class="invoiceTitle" @tap="selProject()">
						<p>*发票项目</p>
						<p style="flex: 1;font-size: 28.9855upx;color: #000000;">{{ projectItem }}</p>
						<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
					<view class="invoiceTitle">
						<p>*收票人姓名</p>
						<input type="text" placeholder="填写收票人姓名" placeholder-style="font-size: 32.60869upx;" v-model="invoiceInfo.recipientName" />
					</view>
					<view class="invoiceTitle">
						<p>*收票人手机</p>
						<input type="text" placeholder="填写收票人手机" placeholder-style="font-size: 32.60869upx;" v-model="invoiceInfo.recipientPhone" />
					</view>
					<view class="invoiceTitle">
						<p>*收票人邮箱</p>
						<input type="text" placeholder="用来接收电子发票" placeholder-style="font-size: 32.60869upx;" v-model="invoiceInfo.recipientEmail" />
					</view>
					<view class="invoiceTitle" v-if="options == 2 ? true : false" @tap="gotoAddUp('SPECIAL')">
						<p>*公司信息</p>
						<p style="flex: 1;font-size:28.9855upx;color: #000000;">
							{{ invoiceInfo.invoiceTitle == '' ? '请添加公司信息' : invoiceInfo.invoiceTitle }}
							<br />
							{{ invoiceInfo.companyTaxNo == '' ? '' : '税号:' + invoiceInfo.companyTaxNo }}
							<br />
							{{ invoiceInfo.invoiceCompanyAddress == '' ? '' : '地址:' + invoiceInfo.invoiceCompanyAddress }}
							<br />
							{{ invoiceInfo.invoiceCompanyPhone == '' ? '' : '电话:' + invoiceInfo.invoiceCompanyPhone }}
							<br />
							{{ invoiceInfo.openingBank == '' ? '' : '银行:' + invoiceInfo.openingBank }}
							<br />
							{{ invoiceInfo.openingAccount == '' ? '' : '卡号:' + invoiceInfo.openingAccount }}
						</p>
						<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
					<view class="invoiceTitle" v-if="options == 2 ? true : false" @tap="gotoAddUp('ADDRESS')">
						<p>配送地址</p>
						<p style="flex: 1;font-size:28.9855upx;color: #000000;">
							{{ invoiceInfo.receiveName == '' ? '请填写配送地址（无需邮寄则不填）' : '姓名：' + invoiceInfo.receiveName }}
							<br />
							{{ invoiceInfo.receivePhone == '' ? '' : '手机号：' + invoiceInfo.receivePhone }}
							<br />
							{{ invoiceInfo.receiveAddress == '' ? '' : '地址：' + invoiceInfo.receiveAddress }}
						</p>
						<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
					<view class="invoiceTitle">
						<p style="flex: 1;color: #000000;">需要备注酒店名称及日期</p>
						<label class="checkbox"><checkbox value="" checked="" /></label>
					</view>
				</view>
				<view class="submit">
					<button type="primary" style="background-color:rgb(253,151,0) ;" @tap="submitInvoice">提交</button>
					<ul class="s-ul">
						<li class="s-li">
							<p>
								发票金额:
								<span>￥340（房费￥340）</span>
							</p>
						</li>
						<li class="s-li"><p>您可在“订单页-查看发票”获取发票开具状态等信息</p></li>
					</ul>
				</view>
			</view>
			<p style="padding: 27.17391upx 18.11594upx" v-if="!whetherNeed">发票由酒店开具，您可以现在预约发票，退房时，在酒店前台领取。如需预约，请选择需要发票</p>
		</scroll-view>
		<view class="selAddress" v-if="isShowAddress">
			<view class="model">
				<view class="titleRow">
					<view class="title">
						<h2>{{ showType == 'ADDRESS' ? '选择地址' : '选择抬头' }}</h2>
					</view>
					<image src="../../static/images/room/error.png" style="width: 54.34782upx;height: 54.34782upx;" mode="" @tap="closeWindows"></image>
				</view>
				<scroll-view scroll-y class="content">
					<view class="address-item" v-for="(item, index) in upAddress.ADDRESS" v-if="showType == 'ADDRESS'" :key="index">
						<!-- <view style="width: 10%;text-align: center;">
							<image src="../../static/images/order/icon/gouxuan.png" style="width: 27.17391upx;height: 27.17391upx;" mode="" v-if="false"></image>
							<image src="../../static/images/order/icon/meixuanzhon.png" style="width: 27.17391upx;height: 27.17391upx;" mode=""></image>
						</view>
						<view style="flex:1;">
							<p style="font-size: 25.36231upx;color: red;">
								<span style="margin-right: 18.11594upx;">{{ item.receiveName }}</span>
								<span>{{ item.receivePhone }}</span>
							</p>
							<p style="font-size: 25.36231upx;color: red;">{{ item.receiveAddress + item.addressNumber }}</p>
						</view>
						<view style="width: 10%;text-align: center;" @tap="addAddress">
							<image src="../../static/images/user/feedback.png" style="width: 36.23188upx;height:36.23188upx;" mode=""></image>
						</view> -->
						<view style="flex:0.8;">
							<p style="font-size: 25.36231upx;">
								<span style="margin-right: 18.11594upx;">{{ item.receiveName }}</span>
								<span>{{ item.receivePhone }}</span>
							</p>
							<p style="font-size: 25.36231upx;">{{ item.receiveAddress + item.addressNumber }}</p>
						</view>
						<p style="color: #0A98D5;flex: 0.2;text-align: center;">
							<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span>
							<span @tap="updUp(item.saveType, item)">编辑</span>
						</p>
					</view>
					<view class="up-item" v-for="(item, index) in upAddress.PERSON" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'">
						<view style="flex: 0.8;">
							<p>个人:{{ item.invoiceTitle }}</p>
						</view>
						<p style="color: #0A98D5;flex: 0.2;text-align: center;">
							<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span>
							<span @tap="updUp(item.saveType, item)">编辑</span>
						</p>
					</view>
					<view class="up-item" v-for="(item, index) in upAddress.UNIT" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'">
						<view style="flex: 0.8;">
							<p>企业:{{ item.invoiceTitle }}</p>
							<p style="color: #666666;">税号：{{ item.companyTaxNo }}</p>
						</view>
						<p style="color: #0A98D5;flex: 0.2;text-align: center;">
							<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span>
							<span @tap="updUp(item.saveType, item)">编辑</span>
						</p>
					</view>
					<view class="up-item" v-for="(item, index) in upAddress.SPECIAL" :key="index" v-if="showType == 'SPECIAL'">
						<view style="flex: 0.8;">
							<p>专用:{{ item.invoiceTitle }}</p>
							<p style="color: #666666;">税号：{{ item.companyTaxNo }}</p>
						</view>
						<p style="color: #0A98D5;flex: 0.2;text-align: center;">
							<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span>
							<span @tap="updUp(item.saveType, item)">编辑</span>
						</p>
					</view>
				</scroll-view>
				<view style="margin-top:36.23188upx;" @tap="addPage(showType)">
					<button style="font-size:25.36231upx;background-color: white;border: 1px solid #666666;color: #666666;margin: 0 18.11594upx;">
						{{ showType == 'ADDRESS' ? '新增地址' : '添加抬头' }}
					</button>
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
			options: 1,
			whetherNeed: true,
			itemList: ['代订房费', '代订住宿费'],
			projectItem: '代订房费',
			//用户信息
			userInfo: {},
			//是否显示新增窗口
			isShowAddress: false,
			//查询抬头，地址数据
			upAddress: {},
			//当前要查的类型
			showType: 'UNIT',
			//可用发票类型
			invoiceTypes: [],
			//发票全部信息
			invoiceInfo: {
				companyTaxNo: '',
				invoiceCompanyAddress: '',
				invoiceCompanyPhone: '',
				invoiceTitle: '',
				invoiceType: '',
				openingAccount: '',
				openingBank: '',
				receiveAddress: '',
				receiveName: '',
				receivePhone: '',
				recipientEmail: '',
				recipientName: '',
				recipientPhone: '',
				riseType: ''
			}
		};
	},
	onLoad(opt) {
		/* console.log(opt.invoiceTypes[1]); */
		this.invoiceTypes = opt.invoiceTypes;
		this.invoiceInfo.invoiceType = this.options;
		user.getUserInfo().then(res => {
			this.userInfo = res;
		});
	},
	onShow(e) {
		let that = this;
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		if (currPage.data.saveUp != undefined) {
			let flag = currPage.data.saveUp;
			if (flag.saveType == 'UNIT') {
				that.invoiceInfo.invoiceTitle = flag.invoiceTitle;
				that.invoiceInfo.companyTaxNo = flag.companyTaxNo;
				that.invoiceInfo.riseType = 2;
				that.invoiceInfo.invoiceCompanyPhone = '';
				that.invoiceInfo.invoiceCompanyAddress = '';
				that.invoiceInfo.openingBank = '';
				that.invoiceInfo.openingAccount = '';
			} else if (flag.saveType == 'PERSON') {
				that.invoiceInfo.invoiceTitle = flag.invoiceTitle;
				that.invoiceInfo.riseType = 1;
				that.invoiceInfo.companyTaxNo = '';
				that.invoiceInfo.invoiceCompanyPhone = '';
				that.invoiceInfo.invoiceCompanyAddress = '';
				that.invoiceInfo.openingBank = '';
				that.invoiceInfo.openingAccount = '';
			} else if (flag.saveType == 'SPECIAL') {
				that.invoiceInfo.invoiceTitle = flag.invoiceTitle;
				that.invoiceInfo.companyTaxNo = flag.companyTaxNo;
				that.invoiceInfo.invoiceCompanyPhone = flag.invoiceCompanyPhone;
				that.invoiceInfo.invoiceCompanyAddress = flag.invoiceCompanyAddress;
				that.invoiceInfo.openingBank = flag.openingBank;
				that.invoiceInfo.openingAccount = flag.openingAccount;
			}
		}
	},
	methods: {
		//是否需要发票
		Need() {
			this.whetherNeed = !this.whetherNeed;
		},
		//选择发票类型
		selType(options) {
			this.options = options;
			this.invoiceInfo.invoiceType = this.options;
			for (var i in this.invoiceInfo) {
				if (i == 'invoiceType') {
					continue;
				} else {
					this.invoiceInfo[i] = '';
				}
			}
		},
		//选择发票项目
		selProject() {
			var that = this;
			uni.showActionSheet({
				itemList: that.itemList,
				success: function(res) {
					console.log(that.itemList[res.tapIndex]);
					that.projectItem = that.itemList[res.tapIndex];
				},
				fail: function(res) {
					/* console.log(res.errMsg); */
				}
			});
		},
		//发票抬头
		gotoAddUp(flag) {
			let typeName;
			let that = this;

			if (that.options == 1) {
				typeName = 'plainInvoice';
			} else if (that.options == 2) {
				typeName = 'specialInvoice';
			} else {
				return;
			}

			api.invoiceList({
				memPk: that.userInfo.memPk
			}).then(res => {
				that.upAddress = res.data;
				/* if (!that.upAddress.hasOwnProperty('UNIT')) {
					if (!that.upAddress.hasOwnProperty('PERSON')) { */
				if (!that.upAddress.hasOwnProperty(flag)) {
					if (flag == 'UNIT' || flag == 'PERSON') {
					} else {
						console.log(that.upAddress);
						if (flag == 'ADDRESS') {
							uni.navigateTo({
								url: 'addAddress'
							});
							that.closeWindows();
						} else {
							uni.navigateTo({
								url: 'addUp?showType=' + typeName
							});
							that.closeWindows();
						}
					}
				}
			});
			that.showType = flag;

			that.openWindows();
		},
		//关闭弹窗
		closeWindows() {
			this.isShowAddress = !this.isShowAddress;
		},
		//打开弹窗
		openWindows() {
			this.isShowAddress = !this.isShowAddress;
		},
		//跳转到添加页面
		addPage(flag) {
			let that = this;
			let typeName;
			if (that.options == 1) {
				typeName = 'plainInvoice';
			} else if (that.options == 2) {
				typeName = 'specialInvoice';
			} else {
				return;
			}

			if (flag == 'ADDRESS') {
				console.log(flag);
				uni.navigateTo({
					url: 'addAddress'
				});
			} else {
				console.log(typeName);
				uni.navigateTo({
					url: 'addUp?showType=' + typeName
				});
			}
			that.closeWindows();
		},
		//使用抬头
		useUp(flag, obj) {
			let that = this;
			if (flag == 'UNIT') {
				that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
				that.invoiceInfo.companyTaxNo = obj.companyTaxNo;
				that.invoiceInfo.riseType = 2;
				that.invoiceInfo.invoiceCompanyPhone = '';
				that.invoiceInfo.invoiceCompanyAddress = '';
				that.invoiceInfo.openingBank = '';
				that.invoiceInfo.openingAccount = '';
			} else if (flag == 'PERSON') {
				that.invoiceInfo.riseType = 1;
				that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
				that.invoiceInfo.companyTaxNo = '';
				that.invoiceInfo.invoiceCompanyPhone = '';
				that.invoiceInfo.invoiceCompanyAddress = '';
				that.invoiceInfo.openingBank = '';
				that.invoiceInfo.openingAccount = '';
			} else if (flag == 'SPECIAL') {
				that.invoiceInfo.invoiceTitle = obj.invoiceTitle;
				that.invoiceInfo.companyTaxNo = obj.companyTaxNo;
				that.invoiceInfo.invoiceCompanyPhone = obj.invoiceCompanyPhone;
				that.invoiceInfo.invoiceCompanyAddress = obj.invoiceCompanyAddress;
				that.invoiceInfo.openingBank = obj.openingBank;
				that.invoiceInfo.openingAccount = obj.openingAccount;
			} else if (flag == 'ADDRESS') {
				that.invoiceInfo.receiveAddress = obj.receiveAddress + obj.addressNumber;
				that.invoiceInfo.receiveName = obj.receiveName;
				that.invoiceInfo.receivePhone = obj.receivePhone;
			}
			console.log(that.invoiceInfo);
			that.closeWindows();
		},
		//编辑抬头
		updUp(flag, obj) {
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
				uni.navigateTo({
					url: 'addUp?showType=' + typeName + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'PERSON') {
				uni.navigateTo({
					url: 'addUp?showType=' + typeName + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'SPECIAL') {
				uni.navigateTo({
					url: 'addUp?showType=' + typeName + '&obj=' + JSON.stringify(obj)
				});
			} else if (flag == 'ADDRESS') {
				uni.navigateTo({
					url: 'addAddress?obj=' + JSON.stringify(obj)
				});
			}
			that.closeWindows();
		},
		//提交发票
		submitInvoice() {
			/* for (var i in that.UNIT) {
				if (that.UNIT[i] != '') {
					continue;
				} else {
					uni.showToast({
						title: '带*号的为必填项 ',
						image: '../../static/images/order/icon/shibai.png'
					});
					return;
				}
			} */

			let that = this;
			if (that.invoiceInfo.invoiceType == 1) {
				console.log('普通发票');
				/* if (that.invoiceInfo.riseType == 1) {
					for (var i in that.invoiceInfo) {
						if (that.invoiceInfo.invoiceTitle != '') {
							continue;
						}
						if (that.invoiceInfo.recipientEmail != '') {
							continue;
						}
						if (that.invoiceInfo.recipientName != '') {
							continue;
						}
						if (that.invoiceInfo.recipientPhone != '') {
							continue;
						}
						if (that.invoiceInfo[i] == '') {
							uni.showToast({
								title: '带*号的为必填项 ',
								image: '../../static/images/order/icon/shibai.png'
							});
							return;
						}
					}
					console.log('提交成功');
					console.log(that.invoiceInfo);
					return;
				}
				if (that.invoiceInfo.riseType == 2) {
					for (var i in that.invoiceInfo) {
						if (that.invoiceInfo.companyTaxNo != '') continue;
						if (that.invoiceInfo.invoiceTitle != '') continue;
						if (that.invoiceInfo.recipientEmail != '') continue;
						if (that.invoiceInfo.recipientName != '') continue;
						if (that.invoiceInfo.recipientPhone != '') continue;
						if (that.invoiceInfo[i] == '') {
							console.log('为空');
							uni.showToast({
								title: '带*号的为必填项 ',
								image: '../../static/images/order/icon/shibai.png'
							});
							return;
						}
					}
					console.log('提交成功');
					console.log(that.invoiceInfo);
					return;
				}
				uni.showToast({
					title: '带*号的为必填项 ',
					image: '../../static/images/order/icon/shibai.png'
				}); */
			} else if (that.invoiceInfo.invoiceType == 2) {
				console.log('专用发票');
				var flag=false;
				for (let i in that.invoiceInfo) {
					if (that.invoiceInfo[i] == '') {
						if (i == 'receiveAddress') continue;
						if (i == 'receivePhone') continue;
						if (i == 'receiveName') continue;
						if (i == 'riseType') continue;
						uni.showToast({
							title: '带*号的为必填项 ',
							image: '../../static/images/order/icon/shibai.png'
						});
						flag=false
					}else{
						flag=true
					}
					
				}
				if(flag){
					console.log('提交成功');
					console.log(that.invoiceInfo);
				}				
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f9fc;
	height: 100%;
}
.selAddress {
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 2;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	.model {
		width: 100%;
		height: 50%;
		background-color: white;
		position: absolute;
		bottom: 0;
		border-top-left-radius: 18.11594upx;
		border-top-right-radius: 18.11594upx;
		.titleRow {
			display: flex;
			padding: 18.11594upx;
			border-bottom: 1px solid #f5f9fc;
			.title {
				flex: 1;
				text-align: center;
			}
			image {
				position: absolute;
				right: 18.11594upx;
			}
		}
		.content {
			height: 70%;
			border-bottom: 1px solid #f5f9fc;
			.address-item {
				display: flex;
				vertical-align: middle;
				align-items: center;
				padding: 18.11594upx;
				border-bottom: 1px solid #f5f9fc;
				view {
					p-font {
						font-size: 21.73913upx;
						color: red;
					}
				}
			}
			.up-item {
				display: flex;
				vertical-align: middle;
				align-items: center;
				padding: 27.17391upx 18.11594upx;
				border-bottom: 1px solid #f5f9fc;
			}
		}
	}
}
.invoicePage {
	.whetherNeed {
		display: flex;
		background-color: white;
		margin-bottom: 18.11594upx;
		padding: 27.17391upx;
		p {
			flex: 1;
		}
	}
	.invoiceType {
		padding-left: 18.11594upx;
		padding-top: 18.11594upx;
		background-color: white;
		margin-bottom: 18.11594upx;
		overflow: hidden;
		.options {
			width: 100%;
			.single {
				width: 46%;
				height: 108.69565upx;
				font-size: 32.60869upx;
				float: left;
				margin-right: 18.11594upx;
				margin-bottom: 18.11594upx;
				text-align: center;
				border: 1px solid rgb(0, 196, 176);
				display: flex;
				vertical-align: middle;
				align-items: center;
				justify-content: center;
				border-radius: 9.05797upx;
			}
			.active {
				color: white;
				background-color: rgb(0, 196, 176);
			}
			.no-active {
				background-color: #333;
			}
		}
	}
	.invoiceDetails {
		background-color: white;
		padding: 18.11594upx;
		padding-bottom: 0;
		margin-bottom: 18.11594upx;
		.invoiceExplain {
			padding-bottom: 18.11594upx;
			border-bottom: 1px solid #f5f9fc;
			.explainTitle {
				color: #666;
				font-size: 25.36231upx;
				padding: 18.11594upx 0;
			}
			.explain-ul {
				list-style: disc !important;
				font-size: 28.9855upx;
				.e-li {
					display: flex;
					vertical-align: middle;
					align-items: center;
					padding-left: 18.11594upx;
					margin-bottom: 18.11594upx;
					p {
						line-height: normal;
					}
				}
				.e-li::before {
					content: '';
					position: absolute;
					display: block;
					width: 3px;
					height: 3px;
					left: 10px;
					background-color: #000;
					border-radius: 50%;
				}
			}
		}
		.invoiceTitle {
			display: flex;
			padding: 18.11594upx 0;
			border-bottom: 1px solid #f5f9fc;
			vertical-align: middle;
			align-items: center;
			p {
				color: #666;
				font-size: 25.36231upx;
				width: 181.15942upx;
			}
			input {
				flex: 1;
			}
		}
	}
	.submit {
		padding: 18.11594upx;
		.s-ul {
			margin-top: 18.11594upx;
			color: #666;
			p > span {
				color: chocolate;
			}
			.s-li {
				display: flex;
				vertical-align: middle;
				align-items: center;
				padding-left: 18.11594upx;
				p {
					font-size: 25.36231upx !important;
				}
			}
			.s-li::before {
				content: '';
				position: absolute;
				display: block;
				width: 3px;
				height: 3px;
				left: 10px;
				background-color: #000;
				border-radius: 50%;
			}
		}
	}
}
</style>
