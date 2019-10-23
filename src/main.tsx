import serviceWorker from './serviceWorker';
import './index.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * 启动本地缓存机制，实现离线访问
 */
serviceWorker();

const rootEle = document.getElementById('root');
class App extends React.Component {
    render () {
        return (
            <div className="p-t-20">
                <p>这是我的第一个应用</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, rootEle);



