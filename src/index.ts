import LoadModule from './loadModule'

const mod = new LoadModule('hew')

mod.init()

/* 控制显示哪个模型 */ 
const squire = document.querySelector('#cusThree');


console.log(mod.name);