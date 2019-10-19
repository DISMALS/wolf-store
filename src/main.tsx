import serviceWorker from './serviceWorker';
import './index.less';
import('./components/home').then(() => {
    console.log('home is load');
});
/**
 * 启动本地缓存机制，实现离线访问
 */
serviceWorker();
