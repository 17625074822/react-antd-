import React from "react";
import {Route, Switch} from "react-router-dom";

import Index from "./components";
// import Create from "./components/create";
// import Vip from "./components/vipList"

function User() {

    return (
        <div>
            <Switch>
                {/*<Route path={'/passport/customer/create'} component={Create}/>*/}
                <Route exact path={'/example/exact'} component={Index}/>
            </Switch>
        </div>
    )
}

export default User;