const EventEmitter = require('events');

const myEmitter = new EventEmitter();

//콜백 등록
myEmitter.on('test', ()=> {
  console.log('1');
})

myEmitter.on('test', ()=> {
  console.log('2');
})

myEmitter.on('test', ()=> {
  console.log('3');
})
//이벤트 발생
myEmitter.emit('test');