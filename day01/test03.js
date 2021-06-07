Promise.resolve().then(() => {
    console.log(1);
    queueMicrotask(() => {
        console.log(2);
    })
  })
  Promise.resolve().then(function () {
      new Promise(function (resolve, reject) {
          console.log(3);
          reject();
      }).catch(function () {
          console.log(4);
      });
  });