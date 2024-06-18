import request from "./index.js";


export const getVipUserInfoApi = (id) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/user/vip',{"id":id},'get',3000)
}
