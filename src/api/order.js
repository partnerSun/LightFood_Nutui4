import request from "./index.js";

// export const getWxUserInfoApi = (data) =>{
//   return request('https://lf.it.novaecs.com/api/user/wxinfo',data,'post',3000)
// }



export const getOrderInfoApi = (data) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/order/check',data,'get',5000)
}
