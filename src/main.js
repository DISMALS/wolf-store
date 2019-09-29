import './styles/index.css';
import './styles/common.less';

function component() {
    const ele = document.createElement('div');
    ele.innerHTML = 'hello, webpackff';
    return ele;
    console.log(ele);
}

document.body.appendChild(component());