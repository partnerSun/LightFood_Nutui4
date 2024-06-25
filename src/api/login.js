import request from "./index.js";

// export const getWxUserInfoApi = (data) =>{
//   return request('https://lf.it.novaecs.com/api/user/wxinfo',data,'post',3000)
// }


export const loginApi = (data) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/auth/login',data,'post',5000)
}

export const vipSignApi = (data) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/auth/vlogin',data,'post',5000)
}
