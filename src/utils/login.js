import request from "./index.js";

export const login2 = (data) =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/auth/login',data,'post',3000)
}
