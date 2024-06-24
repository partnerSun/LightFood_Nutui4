import request from "./index.js";

// export const getWxUserInfoApi = (data) =>{
//   return request('https://lf.it.novaecs.com/api/user/wxinfo',data,'post',3000)
// }



export const payApi = (data) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/order/add',data,'post',5000)
}
