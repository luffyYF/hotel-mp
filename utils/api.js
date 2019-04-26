import request from './request.js'

const apiHf = 'http://192.168.5.11:8084/'
const apiHotel = apiHf + 'miniapp/hotel/'
const IMGURL = 'http://192.168.5.11:8088/'



const api = {
	config: {
		IMGURL
	},
	authorize: (data) => request.post('applet/authorize', {
		appid: data.appid,
		code: data.code,
		encryptedData: data.encryptedData,
		iv: data.encryptedData
	}, {
		baseURL: ApiWxUrl
	}),
	//获取首页的数据
	getHome: (data) => request.get('home/info', {
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
		gradePk: data.gradePk,
		companyPk: data.companyPk,
		beginDate: data.beginDate,
		endDate: data.endDate
	}, {
		baseURL: apiHotel
	}),
	//获取房型信息
	getRoomType: (data) => request.get('roomType/info', {
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
		gradePk:data.gradePk,
		companyPk:data.companyPk,
		roomTypePk:data.roomTypePk,
		beginDate:data.beginDate,
		endDate:data.endDate
	}, {
		baseURL:apiHotel
	})
}

export default api