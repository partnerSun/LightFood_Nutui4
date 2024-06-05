import request from "./index.js";

export const login2 = (data) =>{
  return request('http://127.0.0.1:18881/api/auth/login',data,'post',3000)
}
