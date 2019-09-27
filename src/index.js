function component() {
    const ele = document.createElement('div');
    ele.innerHTML = 'hello, webpack';
    return ele;
}

document.body.appendChild(component());