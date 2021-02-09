import './App.less';
import {Switch, Route, BrowserRouter} from "react-router-dom"

import React from "react";
import Login from "./pages/login";
import Home from "./Home";

function App(props) {
    return (
        <BrowserRouter history={props.history}>{/*<HashRouter>*/}
            <div className="App">
                {/*<DownChrome/>*/}
                <Switch>
                    <Route exact path={'/login'} component={Login}/>
                    {/*<Route exact path={'/forget'} component={Forget}/>*/}
                    {/*<Route exact path={'/admin'} component={Admin}/>*/}
                    {/*<Route path={'/single'} component={Single}/>*/}
                    {/*<Route path={'/opt'} component={Opt}/>*/}
                    <Route path={'/'} component={Home}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
