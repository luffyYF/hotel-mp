import request from './request.js'
import config from '@/utils/config.js'

const apiHotel = config.APIROOTURL + 'miniapp/hotel/'
const apiHotel2 = config.APIROOTURL2 + 'miniapp/hotel/'
const IMGURL = config.IMGROOTURL

const api = {
	config: {
		IMGURL
	},
	/**
	 * 获取微信小程序token
	 * appid: 小程序appid,
	 * code: 小程序登录code,
	 * encryptedData: 用户授权encryptedData,
	 * iv: 用户授权iv
	 */
	authorize: (data) => request.post('wx/applet/authorize', {
		appid: data.appid,
		code: data.code,
		encryptedData: data.encryptedData,
		iv: data.iv
	}, config.APIWXURL),
	/**
	 * 获取授权用户的手机号
	 * url: /wx/applet/authorize/phone
	 * type: post
	 *
	 * @param appid 小程序appid
	 * @param code 微信授权返回的code
	 * @param encryptedData 加密数据
	 * @param iv 加密算法的初始向量
	 * @return BaseResult
	 */
	authorizePhone: (data) => request.post('wx/applet/authorize/phone', {
		appid: data.appid,
		code: data.code,
		encryptedData: data.encryptedData,
		iv: data.iv
	}, config.APIWXURL),
	/**
	 * 绑定会员手机号码
	 * url: /miniapp/hotel/member/bindPhone
	 * type: POST
	 *
	 * @param token 令牌 (放在request头部Authorization中，组装成"Bearer "+token的格式)
	 * @param params 参数
	 *  memPhone 会员手机号
	 * @return BaseResult
	 */
	bindPhone: (data) => request.post('member/bindPhone', {
		memPhone: data.memPhone
	}, apiHotel),
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
		endDate: data.endDate,
		memPk: data.userPk
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
		endDate: data.endDate,
		memPk: data.memPk
	}, apiHotel),
	/* 
	获取订单价格
	url:/miniapp/hotel/order/getOrderPrice
	type:GET
	
	@param beginDate 预定开始日期(必填)
	@param couponMemberPk 优惠券主键
	@param endDate 预定开始日期(必填)
	@param rentCount 预定房间数量(必填)
	@param beginDate 预定结束日期(必填)
	@param roomTypePk 房间类型主键(必填)
	@param userPk 用户主键(必填)
	 */
	getOrderPrice: (data) => request.get('order/getOrderPrice', {
		beginDate: data.beginDate,
		couponMemberPk: data.couponMemberPk,
		endDate: data.endDate,
		rentCount: data.rentCount,
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
		companyPk: config.COMPANYPK,
		roomTypePk: data.roomTypePk,
		userPk: data.userPk
	}, apiHotel2),

	/* 
	 获取房型，优惠卷，可预订数量等下单信息
	 @param beginDate   开始日期
	 @param companyPk   公司主键
	 @param endDate   结束日期
	  @param roomTypePk    房间类型主键
	 @param userPk    用户主键
	 */
	createOrderInfo: (data) => request.get('order/createOrderInfo', {
		beginDate: data.beginDate,
		companyPk: data.companyPk,
		endDate: data.endDate,
		roomTypePk: data.roomTypePk,
		userPk: data.userPk
	}, apiHotel2),

	/* 
	提交订单
	url:/miniapp/hotel/order/createOrder
	type:POST
	
	beginDate*	string($date)
	抵店日期
	companyPk*	string
	公司主键
	couponMemberPk	number($double)
	会员优惠券主键
	endDate*	string($date)
	离店日期
	invoiceAddress	string
	发票寄送地址
	invoiceCompanyAddress	string
	单位地址
	invoiceCompanyPhone	string
	单位电话
	invoiceFlag	integer($int32)
	minimum: -128
	maximum: 127
	是否提供发票 0不提供 1提供
	invoiceTitle	string
	发票抬头
	invoiceType	string
	发票类型（个人：普通发票，电子发票 公司：专用发票）
	Enum:
	Array [ 3 ]
	openingAccount	string
	开户账号
	openingBank	string
	开户行
	personalization	string
	个性化服务，使用逗号拼接
	receiveAddress	string
receiveName	string
receivePhone
	recipientEmail	string
	收票人邮箱
	recipientName	string
	收票人姓名
	recipientPhone	string
	收票人手机号
	remark	string
	订单备注
	rentCount*	integer($int32)
	预定房间数量
	riseType	string
	抬头类型(个人，公司)
	Enum:
	Array [ 2 ]
	roomTypePk*	string
	房型主键
	taxpayerIdentificationNumber	string
	纳税人识别号
	userName	string
	预定人姓名
	userPhone	string
	预定人手机
	userPk*	string
	会员主键
	appid* string
	微信appid
	 */
	createOrder: (data) => request.post('order/createOrder', {
		beginDate: data.beginDate,
		companyPk: config.COMPANYPK,
		couponMemberPk: data.couponMemberPk,
		endDate: data.endDate,
		invoiceAddress: data.invoiceAddress,
		invoiceCompanyAddress: data.invoiceCompanyAddress,
		invoiceCompanyPhone: data.invoiceCompanyPhone,
		invoiceFlag: data.invoiceFlag,
		invoiceTitle: data.invoiceTitle,
		invoiceType: data.invoiceType,
		openingAccount: data.openingAccount,
		openingBank: data.openingBank,
		personalization: data.personalization,
		receiveAddress: data.receiveAddress,
		receiveName: data.receiveName,
		receivePhone: data.receivePhone,
		recipientEmail: data.recipientEmail,
		recipientName: data.recipientName,
		recipientPhone: data.recipientPhone,
		recipientEmail: data.recipientEmail,
		recipientName: data.recipientName,
		recipientPhone: data.recipientPhone,
		remark: data.remark,
		rentCount: data.rentCount,
		riseType: data.riseType,
		roomTypePk: data.roomTypePk,
		taxpayerIdentificationNumber: data.taxpayerIdentificationNumber,
		userName: data.userName,
		userPhone: data.userPhone,
		userPk: data.userPk,
		appid: config.APPID
	}, apiHotel2),

	/* 
	 获取用户订单列表
	 @param orderStatus  订单状态，
	 传空查全部,OBLIGATION(待付款),RESERVE(已付款),CANCEL(已取消),FINISH(已完成)
	 @param pageNum   页码(必填)
	 @param pageSize   每页显示条数(必填)
	 @param userPk  用户主键(必填)
	 */
	listOrder: (data) => request.get('order/listOrder', {
		orderStatus: data.orderStatus,
		pageNum: data.pageNum,
		pageSize: data.pageSize,
		userPk: data.userPk
	}, apiHotel2),
	/* 
	查看用户订单详情
	@param orderPk  订单主键（必填）
	@param userPk   用户主键（必填）
	 */
	getOrder: (data) => request.get('order/getOrder', {
		orderPk: data.orderPk,
		userPk: data.userPk
	}, apiHotel2),

	/* 
	取消订单
	@param orderPk  订单主键（必填）
	@param userPk   用户主键（必填）
	 */
	cancelOrder: (data) => request.post('order/cancelOrder', {
		orderPk: data.orderPk,
		userPk: data.userPk
	}, apiHotel2),

	/* 
	发起支付
	@param appid  支付宝、微信appid
	@param openid   openid
	@param orderPk  订单主键
	@param payType   支付方式
	 */
	payment: (data) => request.post('order/payment', {
		appid: data.appid,
		openid: data.openid,
		orderPk: data.orderPk,
		payType: data.payType
	}, apiHotel2),

	/* 
	addressNumber	string
	门牌号/详情
	companyTaxNo	string
	公司税号
	invoiceCompanyAddress	string
	单位地址
	invoiceCompanyPhone	string
	单位电话
	invoicePk	string
	主键
	invoiceTitle	string
	发票抬头
	memPk	string
	用户主键
	memSex	string
	性别： M男 W女
	openingAccount	string
	单位银行账号
	openingBank	string
	单位开户银行名称
	receiveAddress	string
	发票寄送地址
	receiveName	string
	收货人姓名
	receivePhone	string
	收票人手机号
	saveType	string
	发票保存类型 PERSON个人 UNIT单位 SPECIAL专用 ADDRESS配送地址
	sortNum	integer
	 */
	invoiceSave: (data) => request.post('order/invoice/save', {
		addressNumber: data.addressNumber,
		companyTaxNo: data.companyTaxNo,
		invoiceCompanyAddress: data.invoiceCompanyAddress,
		invoiceCompanyPhone: data.invoiceCompanyPhone,
		invoicePk: data.invoicePk,
		invoiceTitle: data.invoiceTitle,
		memPk: data.memPk,
		memSex: data.memSex,
		openingAccount: data.openingAccount,
		openingBank: data.openingBank,
		receiveAddress: data.receiveAddress,
		receiveName: data.receiveName,
		receivePhone: data.receivePhone,
		saveType: data.saveType,
		sortNum: data.sortNum
	}, apiHotel2),
	/* 
	修改发票信息
	addressNumber	string
	门牌号/详情
	companyTaxNo	string
	公司税号
	invoiceCompanyAddress	string
	单位地址
	invoiceCompanyPhone	string
	单位电话
	invoicePk	string
	主键
	invoiceTitle	string
	发票抬头
	memPk	string
	用户主键
	memSex	string
	性别： M男 W女
	openingAccount	string
	单位银行账号
	openingBank	string
	单位开户银行名称
	receiveAddress	string
	发票寄送地址
	receiveName	string
	收货人姓名
	receivePhone	string
	收票人手机号
	saveType	string
	发票保存类型 PERSON个人 UNIT单位 SPECIAL专用 ADDRESS配送地址
	sortNum	integer($int32)
	 */
	invoiceUpd: (data) => request.post('order/invoice/update', {
		addressNumber: data.addressNumber,
		companyTaxNo: data.companyTaxNo,
		invoiceCompanyAddress: data.invoiceCompanyAddress,
		invoiceCompanyPhone: data.invoiceCompanyPhone,
		invoicePk: data.invoicePk,
		invoiceTitle: data.invoiceTitle,
		memPk: data.memPk,
		memSex: data.memSex,
		openingAccount: data.openingAccount,
		openingBank: data.openingBank,
		receiveAddress: data.receiveAddress,
		receiveName: data.receiveName,
		receivePhone: data.receivePhone,
		saveType: data.saveType,
		sortNum: data.sortNum
	}, apiHotel2),



	/*
	 查找发票，配送地址信息
	 memPk 用户主键
	 saveType  查看类型(必填)	
	 发票保存类型 PERSON个人 UNIT单位 SPECIAL专用 ADDRESS配送地址
	 */
	invoiceList: (data) => request.get('order/invoice/list', {
		saveType: data.saveType
	}, apiHotel2),

	/* 
	收藏房型
	collectPrice 收藏价格
	coverImage 封面图片
	roomTypeName 房型名称
	roomTypePk 房间类型主键
	 */
	collectionCollect: (data) => request.post('collection/collect', {
		collectPrice: data.collectPrice,
		roomTypePk: data.roomTypePk
	}, apiHotel2),

	/* 
	查询用户收藏房型列表
	 */
	collectionList: (data) => request.get('collection/list', {

	}, apiHotel2),

	/* 
	 取消收藏房型
	 */
	collectCancel: (data) => request.post('collection/cancel?roomTypePk=' + data.roomTypePk, {}, apiHotel2),

	/* 
	 查找评论列表
	 filterType 
	 搜索类型 ALL(全部), NEWEST(最新), PICTURE(有图), LOW_GRADE(低分);
	 pageNum 第几页
	 pageSize 每页显示数量
	 roomTypePk 房间类型主键
	 */
	listComment: (data) => request.get('comment/listComment', {
		filterType: data.filterType,
		pageNum: data.pageNum,
		pageSize: data.pageSize,
		roomTypePk: data.roomTypePk
	}, apiHotel2)
}

export default api
