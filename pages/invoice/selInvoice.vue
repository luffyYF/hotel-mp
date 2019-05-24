<template>
	<view class="selPage">
		<uni-nav-bar left-icon="back" statusBar="true" fixed="true" @click-left="back" backgroundColor="#43403a" color="#ffffff" title="查看发票"></uni-nav-bar>
		<view class="row">
			<p class="title">发票类型:</p>
			<p class="content">{{ invoiceInfo.invoiceType == 1 ? '普通发票（电子）' : '专用发票' }}</p>
		</view>
		<view class="row"  v-if="invoiceInfo.riseType==''?false:true">
			<p class="title">抬头类型:</p>
			<p class="content">{{ invoiceInfo.riseType == 1 ? '个人' : '企业' }}</p>
		</view>
		<view class="row">
			<p class="title">抬头名称:</p>
			<p class="content">{{ invoiceInfo.invoiceTitle }}</p>
		</view>
		<view class="row" v-if="invoiceInfo.companyTaxNo==null?false:true">
			<p class="title">税号:</p>
			<p class="content">{{ invoiceInfo.companyTaxNo }}</p>
		</view>
		<view  v-if="invoiceInfo.invoiceCompanyAddress==''?false:true">
			<view class="row" style="color: #333333;font-size:32.60869upx">公司信息</view>
			<view class="row">
				<p class="title">公司地址:</p>
				<p class="content">{{ invoiceInfo.invoiceCompanyAddress }}</p>
			</view>
			<view class="row">
				<p class="title">单位电话:</p>
				<p class="content">{{ invoiceInfo.invoiceCompanyPhone }}</p>
			</view>
			<view class="row">
				<p class="title">所属银行:</p>
				<p class="content">{{ invoiceInfo.openingBank }}</p>
			</view>
			<view class="row">
				<p class="title">银行卡号:</p>
				<p class="content">{{ invoiceInfo.openingAccount }}</p>
			</view>
		</view>
		<view v-if="invoiceInfo.receiveName==''?false:true">
			<view class="row" style="color: #333333;font-size:32.60869upx">配送地址</view>
			<view class="row">
				<p class="title">收件人:</p>
				<p class="content">{{ invoiceInfo.receiveName }}</p>
			</view>
			<view class="row">
				<p class="title">收件人电话:</p>
				<p class="content">{{ invoiceInfo.receivePhone }}</p>
			</view>
			<view class="row">
				<p class="title">收件人地址:</p>
				<p class="content">{{ invoiceInfo.receiveAddress }}</p>
			</view>
		</view>

		<view class="row" style="color: #333333;font-size:32.60869upx">发票信息</view>
		<view class="row">
			<p class="title">收票人姓名:</p>
			<p class="content">{{ invoiceInfo.recipientName }}</p>
		</view>
		<view class="row">
			<p class="title">收票人手机:</p>
			<p class="content">{{ invoiceInfo.recipientPhone }}</p>
		</view>
		<view class="row">
			<p class="title">收票人邮箱:</p>
			<p class="content">{{ invoiceInfo.recipientEmail }}</p>
		</view>
		<view class="row">
			<p class="title">发票金额:</p>
			<p class="content">{{ invoiceInfo.totalPrice+'元'}}</p>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
				riseType: '',
				totalPrice:''
			}
		};
	},
	onLoad(opt) {
		this.invoiceInfo = JSON.parse(opt.invoiceInfo);
	},
	methods: {
		back(){uni.navigateBack()}
	}
};
</script>

<style lang="scss">
.selPage {
	view {
		.row {
			display: flex;
			padding: 18.11594upx 0;
			margin: 0 18.11594upx;
			border-bottom: 1px solid #f5f9fc;

			.title {
				flex: 0.3;
				color: #666;
			}
			.content {
				flex: 0.7;
			}
		}
	}
	.row {
		display: flex;
		padding: 18.11594upx 0;
		margin: 0 18.11594upx;
		border-bottom: 1px solid #f5f9fc;

		.title {
			flex: 0.3;
			color: #666;
		}
		.content {
			flex: 0.7;
		}
	}
}
</style>
