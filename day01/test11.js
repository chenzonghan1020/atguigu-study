console.log(1); //同步
new Promise((res, rej) => {
    console.log(2); //同步 返回一个成功状态的promise对象
    res();
}).then(() => {
    console.log(3); //微任务1
    Promise.resolve().then(() => {
        console.log(5);//微任务1-2
        setTimeout(function () {
            console.log(6); //宏任务 1
            Promise.resolve().then(function () {
                console.log(7);//微任务 队2-1
            });
            setTimeout(function () {
                console.log(8);//宏任务2-1
            }, 0);
        }, 0);
    });
}).then(() => {
    console.log(4);//微任务1-3
});

new Promise((res) => {
    console.log(19); //同步
    setTimeout(() => {
        console.log(20); //宏任务1-2
    }, 0);
});
Promise.resolve().then(() => {
    setTimeout(() => {
        Promise.resolve().then(() => {
            console.log(12);//微任务2-2
        });
        console.log(13); //宏任务1-3
    }, 0);
});
setTimeout(() => {
    console.log(9); //宏任务1-4
    new Promise((res) => {
        res();
        console.log(10);//同步 微任务2的前面
    }).then(() => {
        console.log(11);//微任务2-3
    });
});
setTimeout(() => {
    setTimeout(() => {
        setTimeout(() => {
            Promise.resolve().then(() => {
                console.log(14);//宏任务4-1
            });
            console.log(15);//宏任务3-1
        }, 0);
        console.log(16);//宏任务2-2
    }, 0);
    console.log(17); //宏任务1-5
}, 0);