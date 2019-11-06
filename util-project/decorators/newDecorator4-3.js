'use strict';
/*
 * Dependencies
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _dec2, _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _retrofitCjs = require('retrofit-cjs');

var _lodashDecorators = require('lodash-decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/*
 * Create component
 */

// console.log('Component >>>', Component)
// const f = new Component
// console.log('Component.constructor >>>', Component.constructor)
// console.log('Component.constructor >>>', Component.constructor === Function.prototype)

function log(target) {
  console.log('log target >>>', target);
}

let DebouncePage = (_dec = (0, _retrofitCjs.Debounce)(1000), _dec2 = (0, _lodashDecorators.debounce)(1000), (_class = class DebouncePage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      countRetrofit: 0,
      countLodash: 0
    };
    this.handleClickLodash = this.handleClickLodash.bind(this);
    this.handleClick = this.handleClick.bind(this);
    console.log('constructor this >>>', this);
  }

  foo() {}

  handleClick() {
    console.log('this >>', this);
    const { countRetrofit } = this.state;
    this.setState({
      countRetrofit: countRetrofit + 1
    });
  }

  handleClickLodash() {
    const { countLodash } = this.state;
    console.log('this >', this);
    this.setState({
      countLodash: countLodash + 1
    });
  }
  // render() {
  //   const { countRetrofit, countLodash } = this.state
  //   return (<div>
  //     <div>countRetrofit: {countRetrofit}</div>
  //   <button onClick={this.handleClick}>debounceRetrofit</button>
  //   <div>countLodash: {countLodash}</div>
  //   <button onClick={this.handleClickLodash}>lodash debounce</button>
  //   </div>)
  // }
}, (_applyDecoratedDescriptor(_class.prototype, 'foo', [log], Object.getOwnPropertyDescriptor(_class.prototype, 'foo'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleClick', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'handleClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleClickLodash', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'handleClickLodash'), _class.prototype)), _class));

// const d = new DebouncePage()

// d.foo();


exports.default = DebouncePage;
