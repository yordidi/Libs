// 被装饰对象
var axios = () => {
    return Promise.resolve('ajax执行了')
}

// decorator.js
// 装饰类
var _axios = axios;

axios = (...args) => {

    if (typeof args[0] === 'object') {
        if (!args[0].isManager) {
            return Promise.reject('你没有权限')
        }
    }
    return _axios.apply(null, args)
}

// 具体调用
axios({
    url: '/someurl'
}).then(res => console.log(res)).catch(err => console.log(err)); // 你没有权限

axios({
    url: '/someurl',
    isManager: true
}).then(res => console.log(res)).catch(err => console.log(err)); // ajax执行了

