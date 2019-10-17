import serviceWorker from './serviceWorker';
import './styles/index.css';
import './styles/common.less';
import { cloneDeep, clone } from 'lodash';
import subFn from './components/sub';

/**
 * 启动本地缓存机制，实现离线访问
 */
serviceWorker();



const component = () => {
    const ele = document.createElement('div');
    ele.innerHTML = 'hello, webpack';
    const newEle = cloneDeep(ele);
    console.log(ele);
    console.log('newEle', newEle);
    subFn();
    return ele;
}

document.body.appendChild(component());