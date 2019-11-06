/**
 * javascript 实现杯装咖啡价格
 */

const coffeeColletions = {
    kabuqinuo: {
        price: 150,
    },
    natie: {
        price: 100,
    }
}

const cupColletions = {
    boli: {
        price: 10,
    },
    suliao: {
        price: 9,
    },
    shengtai: {
        price: 8,
    }
}

function cost(coffee, cup) {
    return coffee.price + cup.price
}

console.log('玻璃杯拿铁', cost(coffeeColletions['natie'], cupColletions['boli']));  // 110
console.log('塑料杯拿铁', cost(coffeeColletions['natie'], cupColletions['suliao'])); // 109
console.log('生态杯拿铁', cost(coffeeColletions['natie'], cupColletions['shengtai'])); // 108
console.log('玻璃杯卡布奇诺', cost(coffeeColletions['kabuqinuo'], cupColletions['boli'])); // 160
console.log('塑料杯卡布奇诺', cost(coffeeColletions['kabuqinuo'], cupColletions['suliao'])); // 159
console.log('生态杯卡布奇诺', cost(coffeeColletions['kabuqinuo'], cupColletions['shengtai'])); // 158
