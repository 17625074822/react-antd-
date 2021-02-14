import React from "react";
import {Route, Switch} from "react-router-dom";

import Index from "./components";
import Edit from "./components/edit";
// import Create from "./components/create";
// import Vip from "./components/vipList"

function User() {

    return (
        <div>
            <Switch>
                {/*<Route path={'/passport/customer/create'} component={Create}/>*/}
                <Route exact path={'/im/user/edit/:uuid'} component={Edit}/>
                <Route exact path={'/im/user'} component={Index}/>
            </Switch>
        </div>
    )
}

export default User;