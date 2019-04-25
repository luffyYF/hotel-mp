<template>
	<!--pages/datePicker/datePicker.wxml-->
	<view>
		<!-- 入住/离店时间/入住天数 -->
		<view class="date-header fixed-top">
			<view class="date-days">
				<!-- 入住 -->
				<view class="check-date" style="float:left">
					<view class="date-text">入住日期</view>
					<view>{{ checkIn.month }}月{{ checkIn.day }}日</view>
					<view>周{{ checkIn.week }}</view>
				</view>
				<!-- 离店 -->
				<view class="check-date" style="float:right">
					<view class="date-text">离店日期</view>
					<view v-if="checkOut.timeStamp">{{ checkOut.month }}月{{ checkOut.day }}日</view>
					<view v-if="checkOut.timeStamp">周{{ checkOut.week }}</view>
				</view>
				<!-- 天数 -->
				<view class="check-days" v-if="checkOut.timeStamp">共{{ (checkOut.timeStamp - checkIn.timeStamp) / 86400000 }}晚</view>
			</view>
			<!-- 星期几 -->
			<view class="calendar-header">
				<text class="calendar-week">日</text>
				<text class="calendar-week">一</text>
				<text class="calendar-week">二</text>
				<text class="calendar-week">三</text>
				<text class="calendar-week">四</text>
				<text class="calendar-week">五</text>
				<text class="calendar-week">六</text>
			</view>
		</view>
		<!-- 日期选择器 -->
		<view class="calendar-wrap">
			<!-- 日期 -->
			<view class="calendar-list">
				<view class="calendar-item" v-for="(calendarList, index) in calendarLists" :key="index">
					<!-- 年月 -->
					<view class="year-month">{{ calendarList.year }}年{{ calendarList.month }}月</view>
					<!-- 日子 -->
					<view class="canlendar-day-wrap">
						<view v-for="(item, index) in calendarList.list" :key="index" class="day-row" v-if="item.length != 0">
							<view
								class="canlendar-day"
								v-for="(tmp, index) in item"
								:class="
									(tmp.day ? ' week-day' : '') +
										(tmp.timeStamp < today ? ' disabled' : '') +
										(tmp.timeStamp && tmp.timeStamp == checkIn.timeStamp ? ' check-in' : '') +
										(tmp.timeStamp && tmp.timeStamp == checkOut.timeStamp ? ' check-out' : '') +
										(tmp.timeStamp > checkIn.timeStamp && tmp.timeStamp < checkOut.timeStamp ? ' check-in-day' : '')
								"
								:key="index"
								@click="pickDate"
								:data-stamp="tmp.timeStamp"
								:data-can-click="tmp.timeStamp >= today"
							>
								{{ tmp.timeStamp == today ? '今天' : tmp.date }}
								<view class="check-day-text" v-if="checkIn.timeStamp && tmp.timeStamp == checkIn.timeStamp">入住</view>
								<view class="check-day-text" v-if="checkOut.timeStamp && tmp.timeStamp == checkOut.timeStamp">离店</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 确认按钮  -->
		<view class="btn-wrap"><button hover-class="sure-btn-hover" @click="sureDate">确定</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			calendarLists: [],
			checkIn: '',
			checkOut: '',
			today: ''
		};
	},
	onLoad(options) {
		let _today = new Date();
		// 获取日历数组
		// 6个月日历数组
		let arrs = [];
		for (let i = 1; i < 7; i++) {
			let arr, year, month;
			if (_today.getMonth() + i > 11) {
				year = _today.getFullYear() + 1;
				month = (_today.getMonth() + i) % 11;
			} else {
				year = _today.getFullYear();
				month = _today.getMonth() + i;
			}
			arr = this.showMonthDayList(year, month);
			let obj = {
				year: year,
				month: month,
				list: arr
			};
			arrs.push(obj);
		}
		this.calendarLists = arrs;

		// 显示当天
		let _now_day = new Date();
		_now_day.setHours(0);
		_now_day.setMinutes(0);
		_now_day.setSeconds(0);
		_now_day.setMilliseconds(0);
		this.today = Date.parse(_now_day);
		console.log(options);
		// 入住及离店
		let _checkIn = JSON.parse(options.checkIn),
			_checkOut = JSON.parse(options.checkOut);
		console.log(_checkOut);
		this.checkIn = _checkIn;
		this.checkOut = _checkOut;
	},
	onShow() {},
	methods: {
		// 将时间戳转化为年月日星期
		formatDate(date) {
			let _date = new Date(date);
			let _week = ['日', '一', '二', '三', '四', '五', '六'];
			return {
				year: _date.getFullYear() || '',
				month: _date.getMonth() + 1 || '',
				day: _date.getDate() || '',
				week: _week[_date.getDay()] || '',
				timeStamp: date || ''
			};
		},
		classStr(tmp) {
			return (
				(tmp.day ? ' week-day' : '') +
				(tmp.timeStamp < this.today ? ' disabled' : '') +
				(tmp.timeStamp && tmp.timeStamp == this.checkIn.timeStamp ? ' check-in' : '') +
				(tmp.timeStamp && tmp.timeStamp == this.checkOut.timeStamp ? ' check-out' : '') +
				(tmp.timeStamp > this.checkIn.timeStamp && tmp.timeStamp < this.checkOut.timeStamp ? ' check-in-day' : '')
			);
		},
		pickDate(e) {
			console.info(e.currentTarget);
			if (e.currentTarget.dataset.canClick) {
				let timeStamp = e.currentTarget.dataset.stamp;
				if (this.checkOut.timeStamp) {
					this.checkIn = this.formatDate(timeStamp);
					this.checkOut = this.formatDate('');
					console.log(this.checkOut);
					console.log(this.checkIn);
				} else if (this.checkIn.timeStamp != timeStamp) {
					if (this.checkIn.timeStamp > timeStamp) {
						this.checkIn = this.formatDate(timeStamp);
						this.checkOut = this.formatDate('');
					} else {
						this.checkOut = this.formatDate(timeStamp);
					}
				}
			}
		},
		sureDate() {
			var app = getApp();
			app.$vm.globalData.checkIn = this.checkIn;
			app.$vm.globalData.checkOut = this.checkOut;
			console.log(app.$vm.globalData);

			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			var prevPage = pages[pages.length - 2]; //上一个页面
			//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
			prevPage.setData({
				globalData: app.$vm.globalData
			});
			uni.navigateBack();
		},
		/**
		 * @params year {Number} 年份
		 * @params month {Number} 月份
		 */
		showMonthDayList(year, month) {
			//当前是哪一年
			// let year = date.getFullYear();
			// let month = date.getMonth();

			//当前月的第一天的日期
			let firstDay = new Date(year, month - 1, 1);
			//第一天是星期几
			let weekday = firstDay.getDay();

			//求当前月一共有多少天
			//new Date(year,month+1,0) ： month+1是下一个月，day为0代表的是上一个月的最后一天，即我们所需的当前月的最后一天。
			//getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
			let days;
			if (month > 12) days = new Date(year + 1, 1, 0).getDate();
			else days = new Date(year, month, 0).getDate();

			let res = [[], [], [], [], [], []];
			//输出第一天之前的空格
			if (weekday != 7) {
				for (let i = 0; i < weekday; i++) {
					let obj = {
						day: '',
						date: '',
						timeStamp: ''
					};
					res[0].push(obj);
				}
			}

			for (let j = 1, m = 0; j <= days; j++) {
				let obj = {
					day: weekday == 0 || weekday == 6,
					date: j,
					timeStamp: new Date(year, month - 1, j).getTime()
				};

				res[m].push(obj);
				weekday++;

				//如果是周日则换行
				if (weekday % 7 == 0) {
					weekday = 0;
					m++;
				}
			}
			return res;
		}
	}
};
</script>

<style scoped>
view {
	line-height: inherit;
}
/* pages/datePicker/datePicker.wxss */

.date-header {
	width: 100%;
	height: 190rpx;
	font-size: 24rpx;
	background-color: #f6f6f6;
}

.date-days {
	height: 110rpx;
	padding-top: 10rpx;
	border-bottom: 1px solid #cecece;
	background-color: #fff;
}

.check-date {
	width: 160rpx;
	padding-left: 50rpx;
	color: #333;
}

.date-text {
	color: #999;
	font-size: 22rpx;
}

.check-days {
	width: 160rpx;
	margin: 0 auto;
	color: #ff7a00;
	text-align: center;
	border-bottom: 1px solid #ff7a00;
	padding-top: 20rpx;
	padding-bottom: 15rpx;
}

/* 日期组件 */

.fixed-top {
	position: fixed;
}

.calendar-header {
	background-color: #fff;
	margin-top: 20rpx;
	height: 48rpx;
	line-height: 48rpx;
	padding: 0 20rpx;
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
}

.calendar-week {
	display: inline-block;
	color: #333;
	font-size: 24rpx;
	width: 100rpx;
	text-align: center;
}

/* 日期 */

.calendar-list {
	padding-top: 195rpx;
}

.calendar-item {
	background-color: #fff;
	margin-bottom: 20rpx;
}

.calendar-item:last-child {
	padding-bottom: 130rpx;
}

.year-month {
	color: #333;
	font-size: 24rpx;
	text-align: center;
	padding-top: 54rpx;
	padding-bottom: 40rpx;
}

.canlendar-day-wrap {
	padding: 0 20rpx;
}

.day-row {
	height: 92rpx;
}

.canlendar-day {
	float: left;
	width: 100rpx;
	height: 82rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 24rpx;
	margin-bottom: 10rpx;
}

.week-day {
	color: #cda754;
}

.disabled {
	color: #d1d1d1;
}

.check-in,
.check-out {
	background-color: #cda754;
	color: #fff;
}

.check-in {
	border-radius: 10rpx 0 0 10rpx;
}

.check-out {
	border-radius: 0 10rpx 10rpx 0;
}

.check-day-text {
	line-height: 10rpx;
}

.check-in-day {
	color: #ff7a00;
	background-color: rgba(255, 122, 0, 0.2);
}

/* 确定按钮 */

.btn-wrap {
	width: 100%;
	height: 100rpx;
	padding-bottom: 40rpx;
	background-color: #fff;
	position: fixed;
	bottom: 0rpx;
}

button {
	background-color: #cda754;
	color: #fff;
	font-size: 36rpx;
	width: 710rpx;
	height: 100rpx;
	opacity: 0.9;
	margin: 0 auto;
}

.sure-btn-hover {
	background-color: #cda754;
	opacity: 1;
}
</style>
