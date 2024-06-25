import request from "./index.js";


export const getVipUserInfoApi = (id) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/user/vip',{"id":id},'get',5000)
}


export const updateVipPhoneApi = (data) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/user/uvip',data,'post',5000)
}


export const updateVipInfoApi = (data) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/user/uvipinfo',data,'post',5000)
}
