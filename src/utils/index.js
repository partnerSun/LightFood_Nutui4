
import Taro from '@tarojs/taro';

// 创建一个封装请求方法
const request = (options) => {
  const token = Taro.getStorageSync('token'); // 从本地存储获取token

  return Taro.request({
    ...options,
    header: {
      ...options.header,
      Authorization: `Bearer ${token}`, // 在请求头中添加token
    },
  }).then(response => {
    if (response.statusCode === 401) {
      // 处理未授权的情况，可以重定向到登录页或刷新token
      Taro.showToast({
        title: '登录已过期，请重新登录',
        icon: 'none',
      });
      Taro.redirectTo({
        url: '/pages/login/index',
      });
      return Promise.reject('登录已过期');
    }
    return response;
  }).catch(error => {
    // 处理其他错误
    console.error(error);
    return Promise.reject(error);
  });
};

export default request;
