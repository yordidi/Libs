function log1(target, prop, descriptor) {
    console.log('log1 init')
    const _value = descriptor.value
    descriptor.value = function () {
        console.log('log1 excuting')
        _value.apply(this, arguments)
    }
}

function log2(target, prop, descriptor) {
    console.log('log2 init')
    const _value = descriptor.value

    descriptor.value = function () {
        console.log('log2 excuting')
        _value.apply(this, arguments)
    }
}

class A {
    @log1
    @log2
    bar() {
        console.log('bar')
    }
}

const a = new A

a.bar()


onsubmit() = confirm(validate())()


