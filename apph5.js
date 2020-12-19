import Bridge from './jsBridge'
import { getSettingInfo, getGridInfo, getGoodsInfo } from '@/api/zng'

// h5调用app注册的方法

// 初始化登录成功回调app相应
export function loginStatusToApp(param) {
  Bridge.callHandler('LoginSuccess', JSON.stringify(param), (res) => {  //loginSuccess是app的方法
    console.log('获取app响应数据:' + res)
  })
}

// 返回初始化app界面
export function initializeToApp(param) {
  Bridge.callHandler('gotwostep', JSON.stringify(param), (res) => {
    console.log('获取app响应数据:' + res)
  })
}

// 返回参数信息给app
export function returnParamToApp(param) {
  Bridge.callHandler('ParameterInformation', JSON.stringify(param), (res) => {
    console.log('获取app响应数据:' + res)
  })
}

// 返回格子信息给app
export function returnGridToApp(param) {
  Bridge.callHandler('GridInformation', JSON.stringify(param), (res) => {
    console.log('获取app响应数据:' + res)
  })
}

// 返回物品信息给app
export function returnGoodsToApp(param) {
  Bridge.callHandler('SealInformation', JSON.stringify(param), (res) => {
    console.log('获取app响应数据:' + res)
  })
}
//开格口给app
export function openlock(param){
  Bridge.callHandler('openLid',JSON.stringify(param),(res)=>{
    console.log('获取app响应数据:' + res)
  })
}
//发信息给app重新调用getAppMacAddress获取 Mac地址
export function afreshMacAddress(param){
  Bridge.callHandler('getMac',JSON.stringify(param),(res)=>{
    console.log('获取app响应数据:' + res)
  })
}
//发信息给app新增物品指令
export function readRfidBoxToApp(param){
  Bridge.callHandler('readRfidBox',JSON.stringify(param),(res)=>{
    console.log('获取app响应数据:' + res)
  })
}
//发信息给app取消新增物品指令
export function stopRfidBoxToApp(param){
  Bridge.callHandler('stopRfidBox',JSON.stringify(param),(res)=>{  
    console.log('获取app响应数据:' + res)
  })
}
//发信息给app新增物品信息
export function addSealInfoToApp(param){
  Bridge.callHandler('addSealInfo',JSON.stringify(param),(res)=>{
    console.log('获取app响应数据:' + res)
  })
}

// app调用h5注册的方法

//获取 Mac 地址
export function getAppMacAddress() {
  Bridge.registerHandler('gotoaddcabinet', (datas, responseCallback) => {  //gotoaddcabint 是app调用的前端方法
    let res = JSON.parse(datas)
    localStorage.setItem('address', res.address)
    localStorage.setItem('mac', res.mac)
  })
}

//返回基本信息给app

export function getInfoToApp() {
  getSettingInfo().then(res => {
    if(res.code == 200) {
      returnParamToApp(res.data)
      localStorage.setItem('Setting', JSON.stringify(res.data))
    }
  })
  getGridInfo().then(res => {
    if(res.code == 200) {
      returnGridToApp(res.data)
    }
  })
  getGoodsInfo().then(res => {
    if(res.code == 200) {
      returnGoodsToApp(res.data)
    }
  })
}
