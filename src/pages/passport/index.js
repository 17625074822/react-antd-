import React from "react";
import {Route, Switch} from "react-router-dom";

import Customer from "./customer"
function Passport() {

    return (
        <div>
            <Switch>
                <Route path={'/passport/customer'} component={Customer}/>
                {/*<Route path={'/passport/employee'} component={Employee}/>*/}
                {/*<Route path={'/passport/partner'} component={Partner}/>*/}
            </Switch>
        </div>
    )
}

export default Passport;