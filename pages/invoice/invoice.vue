<template>
	<view>
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="申请发票"></uni-nav-bar>
		<scroll-view class="invoicePage">
			<view class="whetherNeed">
				<p style="font-size: 32.60869upx;">需要发票</p>
				<switch :checked="whetherNeed" @change="Need" color='#cda754' />
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
					<view class="invoiceTitle" v-if="options == 1 ? true : false" @tap="gotoAddUp('PERSON')">
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
					<view class="invoiceTitle" v-if="options == 2 ? true : false" @tap="gotoAddUp('UNIT')">
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
					
				</view>
				<view class="submit">
					<button type="primary" style="background-color:#cda754 ;" @tap="submitInvoice">提交</button>
					<ul class="s-ul">
						<li class="s-li">
							<p>
								发票金额:
								<span>￥{{ invoicePrice }}</span>
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
					<span style="color:#cda754;" @tap="gotoUpd(showType)">编辑</span>
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
						<view style="flex:0.8;"  @tap="useUp(item.saveType, item)">
							<p style="font-size: 25.36231upx;">
								<span style="margin-right: 18.11594upx;">{{ item.receiveName }}</span>
								<span>{{ item.receivePhone }}</span>
							</p>
							<p style="font-size: 25.36231upx;">{{ item.receiveAddress + item.addressNumber }}</p>
						</view>
						<p style="color: #cda754;flex: 0.2;text-align: center;"><span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span></p>
					</view>
					<view class="up-item" v-for="(item, index) in upAddress.PERSON" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'">
						<view style="flex: 0.8;"  @tap="useUp(item.saveType, item)">
							<p>个人:{{ item.invoiceTitle }}</p>
						</view>
						<p style="color: #cda754;flex: 0.2;text-align: center;"><span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">使用</span></p>
					</view>
					<view class="up-item" v-for="(item, index) in upAddress.UNIT" :key="index" v-if="showType == 'PERSON' || showType == 'UNIT'">
						<view style="flex: 0.8;"  @tap="useUp(item.saveType, item)">
							<p>企业:{{ item.invoiceTitle }}</p>
							<p style="color: #666666;">税号：{{ item.companyTaxNo }}</p>
						</view>
						<p style="color: #cda754;flex: 0.2;text-align: center;">
							<span style="margin-right: 9.05797upx;" @tap="useUp(item.saveType, item)">{{ item.isPerfectFlag ? '使用' : '不完善' }}</span>
						</p>
					</view>
				</scroll-view>
				<view @tap="addPage(showType)" class="addBtn">
					<button>{{ showType == 'ADDRESS' ? '新增地址' : '添加抬头' }}</button>
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
			//发票数额
			invoicePrice: '',
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
		this.invoicePrice = opt.invoicePrice;
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
				that.invoiceInfo.invoiceCompanyPhone = flag.invoiceCompanyPhone;
				that.invoiceInfo.invoiceCompanyAddress = flag.invoiceCompanyAddress;
				that.invoiceInfo.openingBank = flag.openingBank;
				that.invoiceInfo.openingAccount = flag.openingAccount;
				that.invoiceInfo.riseType = 2;
				
				currPage.data.saveUp = '';
			} else if (flag.saveType == 'PERSON') {
				that.invoiceInfo.invoiceTitle = flag.invoiceTitle;
				that.invoiceInfo.riseType = 1;
				that.invoiceInfo.companyTaxNo = '';
				that.invoiceInfo.invoiceCompanyPhone = '';
				that.invoiceInfo.invoiceCompanyAddress = '';
				that.invoiceInfo.openingBank = '';
				that.invoiceInfo.openingAccount = '';
				
				currPage.data.saveUp = '';
			} else if (flag.saveType == 'ADDRESS') {
				that.invoiceInfo.receiveAddress = flag.receiveAddress;
				that.invoiceInfo.receiveName = flag.receiveName;
				that.invoiceInfo.receivePhone = flag.receivePhone;
			}
		}
	},
	methods: {
		back(){
			uni.navigateBack();
		},
		//是否完善
		isPerfectFlag(item) {
			let that = this;
			let typeName;
			if (that.options == 1) {
				typeName = 'plainInvoice';
			} else if (that.options == 2) {
				typeName = 'specialInvoice';
			} else {
				return;
			}
			if (typeName == 'specialInvoice') {
				
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
			} else {
			
				item.isPerfectFlag = true;
				return item;
			}
		},
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
								uni.navigateTo({
									url: 'addUp?showType=' + typeName
								});
								that.closeWindows();
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
							uni.navigateTo({
								url: 'addUp?showType=' + typeName
							});
							that.closeWindows();
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
							uni.navigateTo({
								url: 'addAddress'
							});
							that.closeWindows();
						}
					}
				});
			}

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
				uni.navigateTo({
					url: 'addAddress?showType=add'
				});
			} else {
				uni.navigateTo({
					url: 'addUp?showType=' + typeName
				});
			}
			that.closeWindows();
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
					if (!obj.isPerfectFlag) {
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
		},
		//跳到修改
		gotoUpd(flag) {
			let that = this;
			let typeName;
			if (that.options == 1) {
				typeName = 'plainInvoice';
			} else if (that.options == 2) {
				typeName = 'specialInvoice';
			} else {
				return;
			}
			uni.navigateTo({
				url: 'updList?showType=' + flag + '&&typeName=' + typeName
			});
			this.closeWindows();
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
				/* console.log('普通发票'); */
				if (that.invoiceInfo.riseType == 1) {
					var count = 6;
					for (let i in that.invoiceInfo) {
						if (that.invoiceInfo[i] == '') {
							if (i == 'companyTaxNo') continue;
							if (i == 'invoiceCompanyAddress') continue;
							if (i == 'invoiceCompanyPhone') continue;
							if (i == 'openingAccount') continue;
							if (i == 'openingBank') continue;
							if (i == 'receiveAddress') continue;
							if (i == 'receiveName') continue;
							if (i == 'receivePhone') continue;
							uni.showToast({
								title: '带*号的为必填项 ',
								image: '../../static/images/order/icon/shibai.png'
							});
							var num = 0;
							for (let i in that.invoiceInfo) {
								if (that.invoiceInfo[i] == '') {
									num++;
								}
							}
							count = num - 8;
						}
					}
					if (count == 6) {
						/* console.log('提交成功');
						console.log(that.invoiceInfo); */
						var pages = getCurrentPages();
						var currPage = pages[pages.length - 1]; //当前页面
						var prevPage = pages[pages.length - 2]; //上一个页面

						//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
						prevPage.setData({
							invoice: that.invoiceInfo
						});
						uni.navigateBack();
					}
				} else if (that.invoiceInfo.riseType == 2) {
					var count = 7;
					for (let i in that.invoiceInfo) {
						if (that.invoiceInfo[i] == '') {
							if (i == 'invoiceCompanyAddress') continue;
							if (i == 'invoiceCompanyPhone') continue;
							if (i == 'openingAccount') continue;
							if (i == 'openingBank') continue;
							if (i == 'receiveAddress') continue;
							if (i == 'receiveName') continue;
							if (i == 'receivePhone') continue;

							uni.showToast({
								title: '带*号的为必填项 ',
								image: '../../static/images/order/icon/shibai.png'
							});
							var num = 0;
							for (let i in that.invoiceInfo) {
								if (that.invoiceInfo[i] == '') {
									num++;
								}
							}
							count = num - 7;
						}
					}
					if (count == 7) {
						/* console.log('提交成功');
						console.log(that.invoiceInfo); */
						var pages = getCurrentPages();
						var currPage = pages[pages.length - 1]; //当前页面
						var prevPage = pages[pages.length - 2]; //上一个页面

						//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
						prevPage.setData({
							invoice: that.invoiceInfo
						});
						uni.navigateBack();
					}
				} else {
					uni.showToast({
						title: '带*号的为必填项 ',
						image: '../../static/images/order/icon/shibai.png'
					});
				}
			} else if (that.invoiceInfo.invoiceType == 2) {
				/* console.log('专用发票'); */
				var count = 10;
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
						var num = 0;
						for (let i in that.invoiceInfo) {
							if (that.invoiceInfo[i] == '') {
								num++;
							}
						}
						count = num - 4;
					}
				}
				if (count == 10) {
					/* 	console.log('提交成功');
					console.log(that.invoiceInfo); */
					var pages = getCurrentPages();
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面

					//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
					prevPage.setData({
						invoice: that.invoiceInfo
					});
					uni.navigateBack();
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
	.addBtn {
		button {
			font-size: 27.17391upx;
			color: white;
			background-color: #cda754;
			margin: 36.23188upx;
		}
		button::after {
			border: none;
		}
	}

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
				border: 1px solid #cda754;
				display: flex;
				vertical-align: middle;
				align-items: center;
				justify-content: center;
				border-radius: 9.05797upx;
			}
			.active {
				color: white;
				background-color: #cda754;
			}
			.no-active {
				background-color: #999999;
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
