<template>
	<view class="selectPrice">
		<view class="checkindate">
			<view>
				<p>入住</p>
				<p>4月12日 五</p>
			</view>
			<view class="cy"><text>41晚</text></view>
			<view>
				<p>离开</p>
				<p>4月13日 六</p>
			</view>
		</view>
		<view class="payment">
			<view>
				<h2>全额预付 即时订</h2>
				<p>会员等级优惠</p>
			</view>
			<view>
				<span>￥182.4</span>
				<button @click="gotoFill">订</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		gotoFill(){
			uni.navigateTo({
				url:'fillorder'
			})
		}
	}
};
</script>

<style>
uni-page-body {
	width: 100%;
	height: 100%;
}
page{
  height: 100%
}
.selectPrice {
	background-color: #f5f9fc;
	height: 100%;
}
.selectPrice .checkindate {
	display: flex;
	padding: 28.9855upx 90.57971upx;
	margin-bottom: 28.9855upx;
	background-color: #ffffff;
}
.selectPrice .checkindate .cy text {
	border: 0.55px solid #eee;
	font-size: 21.73913upx;
	border-radius: 3px;
	padding: 9.05797upx;
	color: #666666;
}
.selectPrice .checkindate view {
	flex: 1;
	text-align: center;
	display: box;
	box-pack: center;
	box-orient: vertical;
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-orient: vertical;
	color: #666666;
}
.selectPrice .checkindate view > p:nth-child(1) {
	font-size: 25.36231upx;
}
.selectPrice .checkindate view > p:nth-child(2) {
	font-size: 25.36231upx;
	font-weight: 600;
	color: #000000;
}

.selectPrice .payment {
	display: flex;
	background-color: white;
	margin: 0 21.73913upx;
	padding: 9.05797upx 18.11594upx;
	vertical-align: middle;
	align-items: center;
	justify-content: center;
}
.selectPrice .payment > view:nth-child(1) {
	flex: 0.7;
	font-size: 21.73913upx;
	color: #cda754;
	vertical-align: middle;
	align-items: center;

}
.selectPrice .payment > view:nth-child(1) > h2 {
	font-size: 25.36231upx;
	font-weight: 400;
	color: #000000;
	
}
.selectPrice .payment > view:nth-child(2) {
	flex: 0.3;
	font-size: 23.55072upx;
	display: flex;
	justify-content: center;
}
.selectPrice .payment > view:nth-child(2) > span {
	font-size: 28.9855upx;
	color: #f72845;
	font-weight: bold;
}
.selectPrice .payment > view:nth-child(2) > button {
	display: inline-block;
	width: 43.47826upx;
	height: 43.47826upx;
	font-size: 21.73913upx;
	text-align: center;
	padding: 0;
	line-height: 43.47826upx;
	background-color:#cda754 ;
	color: white;
}
</style>
