import React from "react";
import {Route, Switch} from "react-router-dom";

import User from "./user"
import News from "./news"

function Passport() {

    return (
        <div>
            <Switch>
                <Route path={'/im/user'} component={User}/>
                <Route path={'/im/news'} component={News}/>
            </Switch>
        </div>
    )
}

export default Passport;