import React from "react";
import {Route, Switch} from "react-router-dom";

import RedEnvelope from "./redEnvelope/components";

function Passport() {

    return (
        <div>
            <Switch>
                <Route path={'/gift/redEnvelope'} component={RedEnvelope}/>
                {/*<Route path={'/passport/employee'} component={Employee}/>*/}
                {/*<Route path={'/passport/partner'} component={Partner}/>*/}
            </Switch>
        </div>
    )
}

export default Passport;