import { hash } from 'ohash'
import md5 from 'md5'

// 后端返回的数据类型
export interface ResOptions<T> {
    data?: T
    code?: number
    msg?: string
}

/**
 * api请求封装
 * @param { String } url 请求地址
 * @param { Object } options useFtech第二个参数
 * @param { Object } headers 自定义header头, 单独设置headers区分请求参数，也好设置类型
 */
const fetch = (url: string,method?:any, params?: any, headers?: any): Promise<any> => {

    const {  VITE_API_HOST  } = useRuntimeConfig()
    const reqUrl = VITE_API_HOST + url // 你的接口地址
    // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
    const key = hash(JSON.stringify(params) + url)
    const tokenId = '5f11eb4107b24c0c88e2361e442f055e'
    //生成签名
    const publicKey = "AIKF_APP_API_PUBLIC_KEY";
    const privateKey = "AIKF_APP_API_PRIVATE_KEY";
    const timeStamp = new Date().getTime();
    const signKey = publicKey + privateKey + timeStamp;
    let sign = md5(signKey);
    sign = sign.toString().toLocaleUpperCase();
    // 格式化请求体
    let reqParam = {
        // 请求参数
        reqVO: {...params},
        // 请求来源
        reqFrom: 'appApi',
        // 时间戳
        timestamp: timeStamp,
        // 公钥
        publicKey: publicKey,
        // 签名
        sign: sign,
        token: tokenId
    };
    // 可以设置默认headers例如
    // const customHeaders = { token: useCookie('token').value, ...headers }

    return new Promise((resolve, reject) => {
        useFetch(reqUrl, { ...method, body: { ...reqParam   }, key, ...headers }).then(({ data, error }) => {
            if (error.value) {
                reject(error.value)
                return
            }
            const value: ResOptions<any> = data.value as ResOptions<any>;
            // const value = data.value
            // console.log('useFetchResData: ', value)
            if (!value) {
                // 这里处理错你自定义的错误，例如code !== 1
                throw createError({
                    statusCode: 500,
                    statusMessage: reqUrl,
                })
            } else {
                resolve(value)
            }
        }).catch((err: any) => {
            console.log(err)
            reject(err)
        })
    })
}

// const request = {

//     get(url: string, params?: any, headers?: any): Promise<any> {
//         return fetch(url, { method: 'GET', params }, headers)
//     },

//     post(url: string, params?: any, headers?: any): Promise<any> {
//         return fetch(url, { method: 'POST', params }, headers)
//     },

//     put(url: string, params?: any, headers?: any): Promise<any> {
//         return fetch(url, { method: 'PUT', params }, headers)
//     },

//     delete(url: string, params?: any, headers?: any): Promise<any> {
//         return fetch(url, { method: 'DELETE', params }, headers)
//     },
// }
// export default request

function getFn<T = any>(url: string, params?: any, headers?: any): Promise<T> {
    return fetch(url, { method: 'GET' }, params, headers)
}
function postFn<T = any>(url: string, params?: any, headers?: any): Promise<T> {
    return fetch(url, { method: 'POST' } , params , headers)
}
function deleteFn<T = any>(url: string, params?: any, headers?: any): Promise<T> {
    return fetch(url, { method: 'DELETE' }, params, headers)
}
function putFn<T = any>(url: string, params?: any, headers?: any): Promise<T> {
    return fetch(url, { method: 'PUT' }, params, headers)
}

export const useHttp = () => {
    return {
        get: getFn,
        post: postFn,
        delete: deleteFn,
        put: putFn
    }
}
