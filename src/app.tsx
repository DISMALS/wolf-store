import serviceWorker from './serviceWorker';
import './index.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/login'));
const Main = React.lazy(() => import('./pages/main'));
// import routeConfig from './router';

/**
 * 启动本地缓存机制，实现离线访问
 */
serviceWorker();

const rootEle = document.getElementById('root');
class App extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <React.Suspense fallback="<div>loading...3332222</div>">
                    <Switch>
                        <Redirect exact from="/" to="/login"></Redirect>
                        <Route exact path="/login" component={Login}></Route>
                        <Route exact path="/main" render={() => {
                            return (
                                <Main></Main>
                            );
                        }}></Route>
                        <Redirect to="/login"></Redirect>
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, rootEle);



