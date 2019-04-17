<template>
	<view class="fillorderPage">
		<view class="orderContent">
			<view class="room-info">
				<h2>
					豪华双人间
					<span>
						房型详情
						<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</span>
				</h2>
				<p class="tags">
					<span>1.2米单人床 2张</span>
					<span>空调</span>
					<span>WIFI</span>
					<span>电视柜</span>
					<span>电视</span>
				</p>
				<p class="intime">
					入住：
					<span class="days">4月12号</span>
					离店：
					<span class="days">4月13号</span>
					<span>1晚</span>
				</p>
			</view>
			<view class="reserve-msg">
				<span class="reserve-title">预订信息</span>
				<view class="reserve-content">
					<view class="room-count">
						<p>房间数</p>
						<p>
							<image src="../../static/images/order/sub.png" mode=""></image>
							<span>1</span>
							<image src="../../static/images/order/add.png" mode=""></image>
						</p>
					</view>
					<view class="reserve-user">
						<p>预订人</p>
						<p>
							<image src="../../static/images/order/user.png" mode=""></image>
							<span><input type="text" value="李白" /></span>
						</p>
					</view>
					<view class="tellphone">
						<p>手机号码</p>
						<p><input type="text" value="15913570532" /></p>
					</view>
				</view>
			</view>
			<view class="discounts">
				<span class="reserve-title">平台优惠</span>
				<view class="discounts1"><p>已享用：会员优惠</p></view>
				<view class="discounts2">
					<p>优惠卷</p>
					<p>省20元</p>
				</view>
			</view>
			<view class="invoice">
				<view class="invoice1">
					<p>发票</p>
					<p>
						<span>不需要发票</span>
						<image src="../../static/images/order/icon/youjiantou.png" mode=""></image>
					</p>
				</view>
				<view class="invoice2">
					<p>个性化服务</p>
					<p>
						<span>无烟</span>
						<span>宵夜</span>
						<span>晨跑套装</span>
						<span>有小孩</span>
						<span>有老人</span>
						<span>有孕妇</span>
						<span>电影院</span>
					</p>
				</view>
			</view>
			<view class="ServiceOptions">
				<button>无烟</button>
				<button>宵夜</button>
				<button>晨跑套装</button>
				<button>有小孩</button>
				<button>有老人</button>
				<button>有孕妇</button>
				<button>电影院</button>
			</view>
			<view class="Specialtips">
				<p>
					特别提示
					<span>
						本订单预定成功后，根据“
						<a href="#">取消订单规则</a>
						”退款
					</span>
				</p>
			</view>
		</view>
		<view class="operation">
			<button class="orderPrice"><span>￥154.4</span><span>明细</span></button>
			<button class="submitOrder" @click="gotoPayment()">提交订单</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		gotoPayment(){
			uni.navigateTo({
				url:'../payment/payment'
			})
		}
	}
};
</script>

<style>
.fillorderPage {
	background-color: #f5f9fc;
	overflow: hidden;
}
.fillorderPage .orderContent{
	margin-bottom: 81.52173upx;
}
.fillorderPage .orderContent .room-info {
	background-color: white;
	padding: 18.11594upx 28.9855upx;
	margin-bottom: 28.9855upx;
}
.fillorderPage .orderContent .room-info > h2 {
	font-size: 28.9855upx;
	font-weight: 400;
}
.fillorderPage .orderContent .room-info > h2 > span {
	font-size: 25.36231upx;
	color: #cda754;
	display: flex;
	float: right;
	vertical-align: middle;
	align-items: center;
}
.fillorderPage .orderContent .room-info > h2 > span > image {
	width: 28.9855upx;
	height: 28.9855upx;
}
.fillorderPage .orderContent .room-info > h2 > p,
.fillorderPage .orderContent .room-info > .tags {
	font-size: 25.36231upx;
}
.fillorderPage .orderContent .room-info > .tags > span {
	padding-right: 21.73913upx;
}
.fillorderPage .orderContent .room-info > h2 > p > .days {
	color: #cda754;
}
.fillorderPage .orderContent .room-info > h2 > p > span {
	margin: 5.43478upx;
}
.fillorderPage .orderContent .room-info > p {
	font-size: 25.36231upx;
}
.fillorderPage .reserve-msg,
.fillorderPage .discounts {
	background-color: white;
	margin: 57.97101upx 0 28.9855upx 0;
}
.fillorderPage .reserve-msg .reserve-title {
	background: #cda754;
	color: #fff;
	float: left;
	height: 36.23188upx;
	padding: 0 18.11594upx;
	font-size: 21.73913upx;
	border-radius: 10.86956upx 10.86956upx 0 0;
	margin-left: 27.17391upx;
	position: absolute;
	top: 199.27536upx;
}
.fillorderPage .reserve-msg .reserve-content > view,
.fillorderPage .discounts > view,
.fillorderPage .invoice > view {
	padding: 19.92753upx 28.9855upx;
	font-size: 25.36231upx;
	display: flex;
	vertical-align: middle;
	align-items: center;
}
.fillorderPage .reserve-msg .reserve-content > view:nth-child(1) {
	border-bottom: 1px solid #f7f9fb;
}
.fillorderPage .reserve-msg .reserve-content > view:nth-child(2) {
	border-bottom: 1px solid #f7f9fb;
}
.fillorderPage .reserve-msg .reserve-content > view > p:nth-child(1) {
	flex: 0.7;
}
.fillorderPage .reserve-msg .reserve-content > view > p:nth-child(2) {
	flex: 0.3;
	display: flex;
	vertical-align: middle;
	align-items: center;
	justify-content: center;
}
.fillorderPage .reserve-msg .reserve-content > view image {
	width: 36.23188upx;
	height: 36.23188upx;
}
.fillorderPage .reserve-msg .reserve-content .room-count > p:nth-child(2) > span {
	flex: 1;
	text-align: center;
}
.fillorderPage .reserve-msg .reserve-content .reserve-user > p:nth-child(2) > span {
	flex: 1;
	text-align: center;
}

.fillorderPage .discounts .reserve-title {
	background: #cda754;
	color: #fff;
	float: left;
	height: 36.23188upx;
	padding: 0 18.11594upx;
	font-size: 21.73913upx;
	border-radius: 10.86956upx 10.86956upx 0 0;
	margin-left: 27.17391upx;
	position: absolute;
	top: 530.7971upx;
}
.fillorderPage .discounts .discounts1 {
	border-bottom: 1px solid #f7f9fb;
	color: #cda754;
}
.fillorderPage .discounts .discounts2 {
	display: flex;
}
.fillorderPage .discounts .discounts2 > p {
	flex: 1;
}

.fillorderPage .discounts .discounts2 > p:nth-child(2) {
	text-align: right;
	color: #cda754;
}
.fillorderPage .invoice {
	background-color: white;
}
.fillorderPage .invoice .invoice1 {
	border-bottom: 1px solid #f7f9fb;
}
.fillorderPage .invoice .invoice1 > p:nth-child(1) {
	flex: 0.2;
}

.fillorderPage .invoice .invoice1 > p:nth-child(2) {
	flex: 0.8;
	display: flex;
	vertical-align: middle;
	align-items: center;
	justify-content: flex-end;
	color: #999999;
}

.fillorderPage .invoice .invoice1 > p > image {
	width: 28.9855upx;
	height: 28.9855upx;
}

.fillorderPage .invoice .invoice2 > p:nth-child(1) {
	flex: 0.2;
}

.fillorderPage .invoice .invoice2 > p:nth-child(2) {
	flex: 0.8;
}
.fillorderPage .invoice .invoice2 > p:nth-child(2) > span {
	padding: 0 9.05797upx;
}
.fillorderPage .ServiceOptions {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.fillorderPage .ServiceOptions > button {
	flex: 0 0 20%;
	margin: 0;
	width: 22%;
	margin: 18.11594upx;
	max-width: 22%;
	height: 54.34782upx;
	line-height: 54.34782upx;
	font-size: 23.55072upx;
	background: linear-gradient(to bottom, #cda754, #cbbe85) !important;
	color: #fff !important;
}
.fillorderPage .Specialtips{
	font-size: 23.55072upx;
	padding: 0 18.11594upx;
}
.fillorderPage .Specialtips>p>span{
	color: #666666;
}
.fillorderPage .Specialtips>p>span>a{
	color: #cda754;
	display: inline;
}
 .operation {
	width: 100%;
	height: 81.52173upx;
	display: flex;
	position: fixed;
	bottom: 0;
	vertical-align: middle;
	align-items: center;
	
}
 .operation > .orderPrice {
	flex: 1;
	border: none;
	height: 100%;
	line-height: 81.52173upx;
	justify-content: center;
	border-radius: inherit;
	background-color: white;
	font-size: 25.36231upx;
	font-weight: bold;
	color: #f72845;
}
.operation > .orderPrice>span:nth-child(1){
	 color: #f72845;
	 font-size: 32.60869upx;
	 float: left;
 }
 .operation > .orderPrice>span:nth-child(2){
	 color: #333333;
	 font-size: 21.73913upx;
	float: right;
 }
 
 .operation > .orderPrice:after{
	 border: none;
 }

.operation > .submitOrder {
	flex: 1;
	height: 100%;
	justify-content: center;
	line-height: 81.52173upx;
	border: none;
	background-color: #cda754;
	border-radius: inherit;
	font-size: 28.9855upx;
	font-weight: bold;
	color: #fff;
}
 .operation > .submitOrder:after{
	 border: none;
 }

</style>
