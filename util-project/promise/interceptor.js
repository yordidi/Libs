function foo() {
    return new Promise((resolve, reject) => {
        resolve(1);
        // reject(2);
    });
}

foo().then(r => {
    console.log('r====', r);
    // return Promise.reject('then reject');
    return 2;
}, e => {
    console.log('e====', e);
}).catch(c => console.log('c====', c));
