import React from "react";
import {Route, Switch} from "react-router-dom";

import SignIn from "./siginIn/components";

function Login() {

    return (
        <div>
            <Switch>
                <Route path={'/login'} component={SignIn}/>
                {/*<Route path={'/passport/employee'} component={Employee}/>*/}
                {/*<Route path={'/passport/partner'} component={Partner}/>*/}
            </Switch>
        </div>
    )
}

export default Login;