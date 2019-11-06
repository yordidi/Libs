const B = class {
    constructor() {
        this.x = 'BBBB'
    }
}

class A extends B {
    constructor(args) {
        super()
        // code
    }

    // methods
}


const a = new A()

console.log(a.x)

a.__proto__.x = 'AAAAA'

const c = new A()

console.log(c.x)