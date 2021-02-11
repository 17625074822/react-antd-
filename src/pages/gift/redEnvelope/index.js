import React from "react";
import {Route, Switch} from "react-router-dom";

import Index from "./components";
import Edit from "./components/edit";

function User() {

    return (
        <div>
            <Switch>
                {/*<Route path={'/passport/customer/create'} component={Create}/>*/}
                <Route exact path={'/passport/user/edit/:id'} component={Edit}/>
                <Route exact path={'/passport/user'} component={Index}/>
            </Switch>
        </div>
    )
}

export default User;