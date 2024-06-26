// 引入 Taro 和 CryptoJS
import Taro from '@tarojs/taro'
import CryptoJS from 'crypto-js';

// 32 字节复杂密钥
const key = 'k55UUqIBfW3PfmVGZXr3K2wim7xmnehR';
const iv = CryptoJS.enc.Utf8.parse('MZD3xMNT3mKAif5Q'); // 初始化向量（16 字节）

// 将密钥解析为字节数组
const parsedKey = CryptoJS.enc.Utf8.parse(key);

// 加密存储data
export const encryptedStoreData = async (storekey,data) => {
    const dataString = JSON.stringify(data);
    // console.log('开始加密token');
    try {
        let encryptedData = CryptoJS.AES.encrypt(dataString, parsedKey, {
                iv: iv, // CBC 模式下需要 IV
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        // console.log('encryptedToken', encryptedDate);
        Taro.setStorageSync(storekey, encryptedData);
    } catch (error) { 
        console.error('加密存储数据出错:', error);
        throw error; // 如果需要向上层抛出异常，请添加此行
    }
}

// 解密data
export const decodeRetrieveData = async (storekey) => {
    // console.log('开始解密 token');
    try {
        const encryptedData = Taro.getStorageSync(storekey);
        if (encryptedData) {
            let decryptData = CryptoJS.AES.decrypt(encryptedData, parsedKey, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);
            // console.log('decryptToken', decryptToken);
            const decryptedDataObject = JSON.parse(decryptData);
            return decryptedDataObject;
        }
        return null;
    } catch (error) {
        Taro.removeStorageSync(storekey);
        console.error('解密数据出错:', error);
        // 可以根据具体情况处理解密失败的情况，例如返回默认值或抛出异常
        throw error;
    }
}


// 加密存储token
export const encryptedStoreToken = async (storekey,data) => {
    // console.log('开始加密token');
    try {
        let encryptedData = CryptoJS.AES.encrypt(data, parsedKey, {
                iv: iv, // CBC 模式下需要 IV
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        // console.log('encryptedToken', encryptedDate);
        Taro.setStorageSync(storekey, encryptedData);
    } catch (error) { 
        console.error('加密存储数据出错:', error);
        throw error; // 如果需要向上层抛出异常，请添加此行
    }
}

// 解密token
export const decodeRetrieveToken = async (storekey) => {
    // console.log('开始解密 token');
    try {
        const encryptedData = Taro.getStorageSync(storekey);
        if (encryptedData) {
            let decryptData = CryptoJS.AES.decrypt(encryptedData, parsedKey, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);
            // console.log('decryptToken', decryptToken);
            return decryptData;
        }
        return null;
    } catch (error) {
        Taro.removeStorageSync(storekey);
        console.error('解密数据出错:', error);
        // 可以根据具体情况处理解密失败的情况，例如返回默认值或抛出异常
        throw error;
    }
}