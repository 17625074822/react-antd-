import React from "react";
import {Route, Switch} from "react-router-dom";

import User from "./user"

function Passport() {

    return (
        <div>
            <Switch>
                <Route path={'/im/user'} component={User}/>
                {/*<Route path={'/passport/employee'} component={Employee}/>*/}
                {/*<Route path={'/passport/partner'} component={Partner}/>*/}
            </Switch>
        </div>
    )
}

export default Passport;