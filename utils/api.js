import request from './request.js'

const ApiRootUrl = 'http://192.168.5.11:8084/miniapp/'
const ApiRootUrls = 'http://192.168.5.11:8080/miniapp/'

const ApiWxUrl = 'http://192.168.5.11/wx/'


const api ={
	//1、用户旗下拥有的酒店：酒店名
	getUserData:(r) => request.get('serve/company/list?upmsUserId=97771539180552279', null,{
		baseURL: ApiRootUrls
	}),
	//2、通过酒店id从而拿到用户旗下某个酒店现在的住房状态2583636c-71cd-4d7a-afa3-dce10b6b0e55
	 getRoomState:(r) => request.get('serve/roomStatus/list?companyPk=2583636c-71cd-4d7a-afa3-dce10b6b0e55', null,{
		 baseURL: ApiRootUrl
	 }),
	 //3、通过酒店id从而拿到该店的楼层，房型，楼栋，
	 getRoomTyoe:(t)=> request.get('serve/roomType/list?companyPk=2583636c-71cd-4d7a-afa3-dce10b6b0e55', null,{
		 baseURL:ApiRootUrl
	 }),
	 //4、修改房屋的状态通过拿到userId(用户id)，realName(用户姓名) companyPk(酒店id)
	 updateRoomStatus:(paramObj) => request.post('serve/roomStatus/update', paramObj,{
		 baseURL:ApiRootUrl
	 }),
	 //5、根据选择的楼层，栋数，房型来显示符合条件的房间
	 getRoomStates:(paramObj) => request.get('serve/roomStatus/list', paramObj,{
		 baseURL:ApiRootUrl
	 }),
	 //6、把房务状态修改成维修状态的api
	 updateRoomRepair: (paramObj) => request.post('serve/roomStatus/addReason',paramObj,{
		 baseURL:ApiRootUrl
	 }),
	 //7、把维修房转成维修完成之后的状态
	 updateRoomOk: (paramObj) => request.post('serve/roomStatus/delReason',paramObj,{
		 baseURL:ApiRootUrl
	 }),
	 //8、登录验证
	 loginUser:(paramObj) => request.get('serve/user/login',paramObj,{
		 baseURL:ApiRootUrl
	 }),
	
	authorize: (data) => request.post('applet/authorize', {
		appid:data.appid,
		code:data.code,
		encryptedData:data.encryptedData,
		iv:data.iv
	}, {
	  baseURL: ApiWxUrl
	})
}

export default api