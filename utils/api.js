import request from './request.js'
import config from '@/utils/config.js'

const apiHotel = config.APIROOTURL + 'miniapp/hotel/'
const apiHotel2=config.APIROOTURL2+ 'miniapp/hotel/'
const IMGURL = config.IMGROOTURL

const api = {
	config: {
		IMGURL
	},
	authorize: (data) => request.post('applet/authorize', {
		appid: data.appid,
		code: data.code,
		encryptedData: data.encryptedData,
		iv: data.encryptedData
	}, config.ApiWxUrl),
	/**
	 * 首页接口
	 * url: /miniapp/hotel/home/info
	 * type: GET
	 *
	 * @param gradePk 会员级别
	 * @param companyPk 酒店主键
	 * @param beginDate 开始日期
	 * @param endDate 结束日期
	 * @return BaseResult
	 */
	getHome: (data) => request.get('home/info', {
		gradePk: data.gradePk,
		companyPk: data.companyPk,
		beginDate: data.beginDate,
		endDate: data.endDate
	}, apiHotel),
	/**
	 * 查询房型信息
	 * url: /miniapp/hotel/roomType/info
	 * type: GET
	 *
	 * @param gradePk 会员级别
	 * @param companyPk 酒店主键
	 * @param roomTypePk 房型主键
	 * @param beginDate 开始日期
	 * @param endDate 结束日期
	 * @return BaseResult
	 */
	getRoomType: (data) => request.get('roomType/info', {
		gradePk: data.gradePk,
		companyPk: data.companyPk,
		roomTypePk: data.roomTypePk,
		beginDate: data.beginDate,
		endDate: data.endDate
	}, apiHotel),
	/* 
	获取订单价格
	url:/miniapp/hotel/order/getOrderPrice
	type:GET
	
	@param beginDate 预定开始日期(必填)
	@param couponMemberPk 优惠券主键
	@param endDate 预定开始日期(必填)
	@param beginDate 预定结束日期(必填)
	@param roomTypePk 房间类型主键(必填)
	@param userPk 会员主键(必填)
	 */
	getOrderPrice: (data) => request.get('order/getOrderPrice', {
		beginDate: data.beginDate,
		couponMemberPk: data.couponMemberPk,
		endDate: data.endDate,
		roomTypePk: data.roomTypePk,
		userPk: data.userPk
	}, apiHotel2),
	/* 
	查找当前房型用户可用的优惠劵
	url:/miniapp/hotel/order/lisCouponByUser
	type:GET
	
	@param companyPk  酒店主键(必填)
	@param roomTypePk  房间类型主键(必填)
	@param userPk  用户主键(必填)
	 */
	lisCouponByUser: (data) => request.get('order/listCouponByUser', {
		companyPk:config.COMPANYPK,
		roomTypePk:data.roomTypePk,
		userPk:config.USERPK
	}, apiHotel2)
}

export default api
