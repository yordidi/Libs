'use strict';
/*
 * Dependencies
 */
// import React, { Component } from 'react';
// import {Debounce} from 'retrofit-cjs';
// import {debounce as d1} from 'lodash-decorators';
/*
 * Create component
 */

// console.log('Component >>>', Component)
// const f = new Component
// console.log('Component.constructor >>>', Component.constructor)
// console.log('Component.constructor >>>', Component.constructor === Function.prototype)

function Component() {

}

function log(target) {
  console.log('log target >>>', target)
}

class DebouncePage extends Component {
  state = {
    countRetrofit: 0,
    countLodash: 0
  }
  constructor(props) {
    super(props);
    this.handleClickLodash = this.handleClickLodash.bind(this)
    this.handleClick = this.handleClick.bind(this)
    console.log('constructor this >>>', this)
  }
  @log
  foo() {

  }
  // @Debounce(1000)
  // handleClick() {
  //   console.log('this >>', this)
  //   const { countRetrofit } = this.state
  //   this.setState({
  //     countRetrofit: countRetrofit + 1
  //   })
  // }
  //
  // @d1(1000)
  // handleClickLodash() {
  //   const { countLodash } = this.state
  //   console.log('this >', this)
  //   this.setState({
  //     countLodash: countLodash + 1
  //   })
  // }
  // render() {
  //   const { countRetrofit, countLodash } = this.state
  //   return (<div>
  //     <div>countRetrofit: {countRetrofit}</div>
  //   <button onClick={this.handleClick}>debounceRetrofit</button>
  //   <div>countLodash: {countLodash}</div>
  //   <button onClick={this.handleClickLodash}>lodash debounce</button>
  //   </div>)
  // }
}

// const d = new DebouncePage()

// d.foo();


export default DebouncePage;
