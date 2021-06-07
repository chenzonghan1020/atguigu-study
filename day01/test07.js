process.nextTick(() => {
    console.log('process.nextTick() 333');
  })
  
  setTimeout(() => {
    console.log('setTimeout()  111');
  }, 0)
  
  setImmediate(() => {
    console.log('setImmediate() 222');
  })
  
  console.log('全局代码执行完了 444');