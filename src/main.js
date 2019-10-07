import './styles/index.css';
import './styles/common.less';
import { cloneDeep, clone } from 'lodash';

const component = () => {
    const ele = document.createElement('div');
    ele.innerHTML = 'hello, webpack';
    const newEle = cloneDeep(ele);
    console.log(ele);
    console.log('newEle', newEle);
    return ele;
}

document.body.appendChild(component());