import request from './request.js'
import config from '@/utils/config.js'

const apiHotel = config.APIROOTURL + 'miniapp/hotel/'
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
		gradePk:data.gradePk,
		companyPk:data.companyPk,
		roomTypePk:data.roomTypePk,
		beginDate:data.beginDate,
		endDate:data.endDate
	}, apiHotel)
}

export default api