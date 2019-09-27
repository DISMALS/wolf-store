function component() {
    const ele = document.createElement('div');
    ele.innerHTML = 'hello, webpack';
    return ele;
    console.log(ele);
}

document.body.appendChild(component());