import store from 'store2';

store.set('yaodi', 18);

console.log(store.get('yaodi')); // 18

/**
 * 存/取预览码
 * @param code
 */
let codeList = store.get('previewCode') || [];
function storeCode(code) {
    if (!codeList.includes(code)) {
        codeList.push(code);
        if (codeList.length >= 10) {
            codeList.shift();
        }
    }
    console.log('<<>', codeList);
    store.set('previewCode', codeList);
}

function getStoredCode() {
    console.log('>>>', codeList)
}

storeCode('2');
getStoredCode();
