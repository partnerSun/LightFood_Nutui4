import request from "./index.js";

export const productCheck = () =>{
  // console.log("date",data)
  return request('https://lf.it.novaecs.com/api/product/check',{},'get',3000)
}
