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
						<view class="single" :class="options == 1 ? 'active' : ''" @tap="selType(1)" :disabled="invoiceTypes[0] == 1 ? true : false">
							<p>
								普通发票（电子）
								<span style="display: block; font-size: 21.73913upx;">发至您的邮箱</span>
							</p>
						</view>
						<view class="single" :class="options == 2 ? 'active' : ''" @tap="selType(2)" :disabled="invoiceTypes[2] == 2 ? true : false">
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
					<view class="invoiceTitle" v-if="options == 1 ? true : false" @tap="gotoAddUp(['PERSON', 'UNIT'])">
						<p>*发票抬头</p>
						<p style="flex: 1;font-size:28.9855upx;color: #000000;">请添加抬头信息</p>
						<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
					<view class="invoiceTitle" @tap="selProject()">
						<p>*发票项目</p>
						<p style="flex: 1;font-size: 28.9855upx;color: #000000;">{{ projectItem }}</p>
						<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
					<view class="invoiceTitle">
						<p>*收票人姓名</p>
						<input type="text" placeholder="填写收票人姓名" placeholder-style="font-size: 32.60869upx;" />
					</view>
					<view class="invoiceTitle">
						<p>*收票人手机</p>
						<input type="text" placeholder="填写收票人手机" placeholder-style="font-size: 32.60869upx;" />
					</view>
					<view class="invoiceTitle">
						<p>*收票人邮箱</p>
						<input type="text" placeholder="用来接收电子发票" placeholder-style="font-size: 32.60869upx;" />
					</view>
					<view class="invoiceTitle" v-if="options == 2 ? true : false" @tap="gotoAddUp(['SPECIAL'])">
						<p>*公司信息</p>
						<p style="flex: 1;font-size:28.9855upx;color: #000000;">请添加公司信息</p>
						<image style="width: 36.23188upx;height: 36.23188upx;" src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</view>
					<view class="invoiceTitle" v-if="options == 2 ? true : false" @tap="gotoAddress">
						<p>配送地址</p>
						<p style="flex: 1;font-size:28.9855upx;color: #000000;">请填写配送地址（无需邮寄则不填）</p>
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
					<view class="title"><h2>选择地址</h2></view>
					<image src="../../static/images/room/error.png" style="width: 54.34782upx;height: 54.34782upx;" mode="" @tap="closeWindows"></image>
				</view>
				<scroll-view scroll-y class="content">
					<view class="address-item" v-if="false">
						<view style="width: 10%;text-align: center;">
							<image src="../../static/images/order/icon/gouxuan.png" style="width: 27.17391upx;height: 27.17391upx;" mode=""></image>
						</view>
						<view>
							<p style="font-size: 25.36231upx;color: red;">
								<span style="margin-right: 18.11594upx;">尹帆</span>
								<span>15770634606</span>
							</p>
							<p style="font-size: 25.36231upx;color: red;">广东省珠海市香洲区拱北联安路192号豪斯菲尔信息科技公司</p>
						</view>
						<view style="width: 10%;text-align: center;" @tap="addAddress">
							<image src="../../static/images/user/feedback.png" style="width: 36.23188upx;height:36.23188upx;" mode=""></image>
						</view>
					</view>
					<view class="up-item" >
						<view style="flex: 0.8;">
							<p>新源县吐尔根乡哈那哈提养殖专业合作社</p>
							<p style="color: #666666;">税号：098098098098098900098</p>
						</view>
						<p style="color: #0A98D5;flex: 0.2;text-align: center;">
							<span style="margin-right: 9.05797upx;">使用</span>
							<span>编辑</span>
						</p>
					</view>
				</scroll-view>
				<view style="margin-top:36.23188upx;" @tap="addAddress">
					<button style="font-size:25.36231upx;background-color: white;border: 1px solid red;color: red;margin: 0 18.11594upx;">新增地址</button>
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
			//可用发票类型
			invoiceTypes: '',
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
		console.log(opt.invoiceTypes);
		this.invoiceTypes = opt.invoiceTypes;
		user.getUserInfo().then(res => {
			this.userInfo = res;
		});
	},
	onShow() {},
	methods: {
		//是否需要发票
		Need() {
			this.whetherNeed = !this.whetherNeed;
		},
		//选择发票类型
		selType(options) {
			this.options = options;
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
				that.upAddress = res;
			});
			if (flag.length == 2) {
				if (res.code == 1) {
					if (res.hasOwnProperty(selFlag)) {
					} else {
						uni.navigateTo({
							url: 'addUp?showType=' + typeName
						});
					}
				}
			}
		},
		//配送地址
		gotoAddress() {
			this.openWindows();
		},
		//关闭弹窗
		closeWindows() {
			this.isShowAddress = !this.isShowAddress;
		},
		//打开弹窗
		openWindows() {
			this.isShowAddress = !this.isShowAddress;
		},
		//新增收货地址
		addAddress() {
			uni.navigateTo({
				url: 'addAddress'
			});
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
			if (that.options == 1) {
				console.log('普通发票');
			} else if (that.options == 2) {
				console.log('专用发票');
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
	position: absolute;
	top: 0;
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
				padding: 18.11594upx 0;
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
