
const os = require('os');
const Happypack = require('happypack'); // 将打包任务分解为子任务多进程同时进行
const happyThreadPool = Happypack.ThreadPool({size: os.cpus().length}); // 获取系统cpu内核数量
module.exports = (id, loaders) => {
    return new Happypack({ // 多进程打包
        id,
        loaders,
        threadPool: happyThreadPool, // 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多
    });
};