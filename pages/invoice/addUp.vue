<template>
	<view class="addUpPage">
		<view class="plainInvoice" v-if="showType == 'plainInvoice' ? true : false">
			<view class="UpType">
				<p>抬头类型</p>
				<view class="selType">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="enterprise" color="rgb(6,193,174)" checked="" />
							企业
						</label>
						<label class="radio">
							<radio value="personage" color="rgb(6,193,174)" checked="" />
							个人
						</label>
					</radio-group>
				</view>
			</view>
			<view class="companyName" v-if="upTypeName == 'personage' ? true : false">
				<p>*抬头名称</p>
				<input type="text" placeholder="建议填写个人姓名/店名" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
			<view class="companyName" v-if="upTypeName == 'enterprise' ? true : false">
				<p>*公司抬头</p>
				<input type="text" placeholder="请输入准确的抬头名称" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
			<view class="companyNumber" v-if="upTypeName == 'enterprise' ? true : false">
				<p>*公司税号</p>
				<input type="text" placeholder="请输入税号" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
		</view>
		<view class="specialInvoice" v-if="showType == 'specialInvoice' ? true : false">
			<view class="row">
				<p>*公司抬头</p>
				<input type="text" placeholder="请输入准确的抬头名称" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
			<view class="row">
				<p>*公司税号</p>
				<input type="text" placeholder="请输入税号" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
			<view class="row">
				<p>电话号码</p>
				<input type="text" placeholder="请输入单位电话号码" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
			<view class="row">
				<p>单位地址</p>
				<input type="text" placeholder="单位注册地址信息" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
			<view class="row">
				<p>开户银行</p>
				<input type="text" placeholder="单位的开户行名称" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
			<view class="row">
				<p>银行账号</p>
				<input type="text" placeholder="单位的银行账号" placeholder-style="color:#999;font-size:27.17391upx" value="" />
			</view>
		</view>

		<view class="operationBtn">
			<button @tap="saveUse">保存并使用</button>
			<button @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			upTypeName: 'personage',
			showType: ''
		};
	},
	onLoad(opt) {
		if (opt.showType == 'plainInvoice') {
			this.showType = 'plainInvoice';
		}
		if (opt.showType == 'specialInvoice') {
			this.showType = 'specialInvoice';
		}
	},
	methods: {
		//选择抬头类型
		radioChange(e) {
			this.upTypeName = e.target.value;
		},
		//保存信息
		save(){
			
		},
		//保存并使用
		saveUse(){
			
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
	.operationBtn {
		button {
			font-size: 27.17391upx;
			color: white;
			background-color: rgb(6, 193, 174);
			margin: 36.23188upx;
		}
	}
}
</style>
