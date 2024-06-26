// 引入 Taro 和 CryptoJS
import Taro from '@tarojs/taro'
import CryptoJS from 'crypto-js';

// 32 字节复杂密钥
const key = 'k55UUqIBfW3PfmVGZXr3K2wim7xmnehR';
const iv = CryptoJS.enc.Utf8.parse('MZD3xMNT3mKAif5Q'); // 初始化向量（16 字节）

// 将密钥解析为字节数组
const parsedKey = CryptoJS.enc.Utf8.parse(key);

// 加密存储 Token
export const storeToken = async (token) => {
    // console.log('开始加密token');
    try {
        let encryptedToken = CryptoJS.AES.encrypt(token, parsedKey, {
                iv: iv, // CBC 模式下需要 IV
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        console.log('encryptedToken', encryptedToken);
        Taro.setStorageSync('encryptedToken', encryptedToken);
    } catch (error) { 
        console.error('加密存储 Token 出错:', error);
        throw error; // 如果需要向上层抛出异常，请添加此行
    }
}

// 解密使用 Token
export const retrieveToken = async () => {
    // console.log('开始解密token');
    const encryptedToken = Taro.getStorageSync('encryptedToken');
    if (encryptedToken) {
        let decryptToken = CryptoJS.AES.decrypt(encryptedToken, parsedKey, {
            iv: iv, // 解密时需要相同的 IV
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
        console.log('decryptToken', decryptToken);
        return decryptToken;
    }
    return null;
}

