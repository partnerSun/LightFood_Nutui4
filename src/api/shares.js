import request from "./index.js";

export const sharesCheck = () =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/share/check',{},'get',5000)
}
