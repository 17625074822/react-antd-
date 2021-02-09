import {Modal, message} from 'antd';
import axios from "axios";
import qs from 'qs';

let common = {}

common.redirectToLogin = function () {
    window.location = '/login'
}


common.base64Encode = function (input) {
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0, output = '', utftext = '';
    input = input.replace(/\r\n/g, "\n");
    for (let n = 0; n < input.length; n++) {
        let c = input.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    while (i < utftext.length) {
        chr1 = utftext.charCodeAt(i++);
        chr2 = utftext.charCodeAt(i++);
        chr3 = utftext.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
}

common.alert = function (content, callback, title) {
    title = title || '提示'
    callback = callback || function () {
    }

    Modal.info({
        title: title,
        content: content,
        onOk() {
            callback()
        },
    });

    // window.popup.alert(content, function () {
    //     callback()
    // });

}

common.toast = function (content, callback, duration) {
    duration = duration || 2 // 单位：秒

    callback = callback || function () {
    }

    message.info(content, duration);

    setTimeout(() => {
        callback()
    }, duration * 1000);

    // const modal = Modal.success({
    //     // title: 'This is a notification message',
    //     content: content,
    // });

    // window.popup.cute(content, duration * 1000, callback);
}

common.loadingStart = function (message) {
    message = message || '加载中...'

    // window.popup.loading(true);

    let mask = document.createElement("div")
    mask.setAttribute("id", "myloadingmask")
    mask.style.position = "absolute"
    // mask.style.backgroundColor = "#eee"
    mask.style.width = "100%"
    mask.style.height = "100%"
    mask.style.zIndex = 999
    mask.style.top = "0px"
    mask.style.left = "0px"
    document.getElementsByTagName("body")[0].appendChild(mask)

    let container = document.createElement("div")
    container.setAttribute("id", "myloading")
    container.setAttribute("class", "container")

    let loading = document.createElement("div")
    loading.setAttribute("class", "loading")
    container.appendChild(loading)

    let style = document.createElement("style")
    style.innerHTML = `
     .container {
        z-index: 10000;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .loading {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        border: 5px #aaa solid;
        border-right-color: #1890ff;
        animation: loading 1s linear infinite;
    }

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }`

    container.appendChild(style)
    document.getElementsByTagName("body")[0].appendChild(container)

}

common.loadingStop = function () {
    // window.popup.loading(false);

    let myloading = document.getElementById("myloading")
    if (myloading) {
        document.getElementsByTagName("body")[0].removeChild(myloading)
    }

    let myloadingmask = document.getElementById("myloadingmask")
    if (myloadingmask) {
        document.getElementsByTagName("body")[0].removeChild(myloadingmask)
    }
}

common.confirm = function (message, okCallback, cancelCallback, title) {
    title = title || '提示'

    okCallback = okCallback || function () {
    }
    cancelCallback = cancelCallback || function () {
    }

    Modal.confirm({
        title: title,
        content: message,
        onOk() {
            okCallback()
        },
        onCancel() {
            cancelCallback()
        },
    });

    // window.popup.confirm(message, okCallback, cancelCallback);
}


common.ajax = function (method, api, data, config = {}) {

    data = data || {}

    const isGet = method.toLowerCase() === 'get'

    const configDefault = {
        'contentType': 'application/json', // application/x-www-form-urlencoded、multipart/form-data、application/json
        'timeout': 20000,                  // 调用api超时时间为20秒
        'displayError': true,              // 调用api出错时，是否显示错误消息
        'useToken': true,                  // api是否需要使用token。如果需要token而本地没有token时，将重定向到登录页
        'interceptInvalidToken': true,     // api返回token无效时，是否拦截。如果拦截，将重定向到登录页
        'responseType': 'json',             // 返回数据格式 json、text、blob
        'filename': 'temp.xlsx',            // 下载文件名
    }

    config = Object.assign(configDefault, config)

    if (!isGet && config['contentType'].toLowerCase() === 'application/x-www-form-urlencoded') {
        data = qs.stringify(isGet ? null : data)
    }

    let headers = {
        'Content-Type': config['contentType']
    }

    if (config.useToken) {

        headers['token'] = common.getToken()
        if (headers['token'].length === 0) {

            common.redirectToLogin()

            return new Promise((resolve, reject) => {
                reject({code: 'MISS_TOKEN', message: "请登录", data: null})
            })
        }
    }

    return new Promise((resolve, reject) => {

        axios({
            method: method,
            url: common.getApiUrl(api, isGet ? data : {}),
            data: data,
            headers: headers,
            timeout: config.timeout,
            responseType: config['responseType']
        }).then((response) => {

            // 二进制直接下载
            if (config['responseType'] === 'blob') {
                const filename = config['filename']
                const blob = new Blob([response.data], {type: 'application/octet-stream'})
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    window.navigator.msSaveBlob(blob, decodeURI(filename))
                } else {
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.href = url
                    a.setAttribute('download', decodeURI(filename))
                    if (typeof a.download === 'undefined') {
                        a.setAttribute('target', '_blank')
                    }
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    window.URL.revokeObjectURL(url)
                }
                resolve(response.data.data)
                return;
            }

            //response.data:  {code:"SUCCESS", message:"xxx", data: "xxx"}
            if (response.data.code === 'SUCCESS') {
                resolve(response.data.data)
                return
            }

            switch (response.data.code) {
                case 'INVALID_TOKEN':
                    if (config.interceptInvalidToken) {

                        common.setToken(null)

                        if (config.displayError) {
                            common.toast('请登录')
                        }

                        common.redirectToLogin()
                    }
                    break

                default:
                    if (config.displayError) {
                        common.alert(response.data.message)
                    }
            }

            reject(response.data)

        }).catch((error) => {
            config.displayError && common.alert("" + error)
            reject({code: 'ERROR', message: '' + error, data: null})
        })

    })
}

/**
 * 填充数组到指定长度
 */
common.arrayPad = (arr, rows, empty = {}) => {
    if (arr.length >= rows) {
        return arr
    }
    let num = rows - arr.length
    for (let i = 0; i < num; i++) {
        arr.push({...empty, id: -1 - i}) //空数据，id为负数，方便识别
    }
    return arr
}

export default common
