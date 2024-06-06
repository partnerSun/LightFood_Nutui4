import Taro from '@tarojs/taro';


// 拦截器的实现
const interceptor = chain => {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;

  // 在请求之前添加时间戳以避免缓存
  if (method.toUpperCase() === 'GET') {
    const timeStamp = new Date().getTime();
    if (data) {
      data.timeStamp = timeStamp;
    } else {
      requestParams.data = { timeStamp };
    }
  }

  // 从本地存储中获取 token
  let token = '';
  try {
    token = Taro.getStorageSync('TOKEN_NAME');
  } catch (error) {
    token = '';
  }

  // 将 token 添加到请求头中
  if (token) {
    requestParams.header = {
      ...requestParams.header,
      Authorization: token
    };
  }

  return chain.proceed(requestParams).then(response => {
    console.log("拦截器response:",response)
    // 在响应拦截器中处理响应数据
    if (response.statusCode === 200) {
      if (response.data.status === 401) {
        console.log('认证失败')
        Taro.removeStorageSync('TOKEN_NAME');
        if (Taro.getCurrentPages().pop().route !== 'pages/login/login') {
          // Taro.redirectTo({ url: '/pages/login/login' });
          console.log('跳转到login页')
        }
      }
      return response;
    } else {
      console.log("请求错误",response.statusCode)
      return Promise.reject(response);
    }
  }).catch(error => {
    console.log("请求错误",error.message)
    return Promise.reject(error);
  });
};

// 添加拦截器
Taro.addInterceptor(interceptor);

// 封装的请求函数
const request = (url = '', data = {}, method = 'GET', timeout = 5000) => {
  console.log("url:",url)
  return new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      data,
      method,
      timeout,
      // header: {
      //   'content-type': 'application/json'
      // }
    }).then(response => {
      if (response.statusCode === 200) {
        resolve(response.data);
      } else {
        reject(new Error(`请求错误: ${response.statusCode}`));
      }
    }).catch(error => {
      reject(new Error(`请求错误: ${error.message}`));
    });
  });
};

export default request;
