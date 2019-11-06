/**
 * 请求超时或者失败，自动重连
 * @param fn
 * @param maxTryTimes
 * @param errHandler
 * @returns {function(...[*]): Promise<*|void>}
 */

function autoRetry(fn, maxTryTimes, errHandler) {
    return async function (...args) {
        let tryTimes = 0;

        async function inner() {
            try {
                tryTimes++;
                return await fn(...args);
            } catch (err) {
                if (errHandler && errHandler(err)) return inner();
                if (tryTimes === maxTryTimes) throw err;
                return inner();
            }
        }

        return inner();
    };
}

function foo(fn, maxTimes, errorHanlder) {
    let times = 0;

    async function inner() {
        try {
            times++;
            return await fn();
        } catch (e) {
            if (times === maxTimes) throw e;
            errorHanlder && errorHanlder(e);
            return inner();
        }
    }

    return inner();
}

function bar() {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve('success');
        }
        reject('error');
    })
}

foo(bar, 3, (e) => {
    console.log('error===', e);
}).then(r => console.log('>>>', r));
