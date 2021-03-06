const serviceWorker = () => {
    if ('serviceWorker' in navigator) { // 离线缓存策略
        window.addEventListener('load', () => {
          // 敲黑板, 这里的service-wroker.js需要根据实际情况变化, 因为我项目没部署到根域名, 所以加了workbox的路径名...
          // 注意: 这里有个坑 service-wroker 会被缓存, 解决方案在下面的坑点介绍
          navigator.serviceWorker.register(`./service-wroker.js?${new Date().getTime()}`).then(registration => {
            console.log('SW registered: ', registration);
          }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          })
        })
    }
}
export default serviceWorker;