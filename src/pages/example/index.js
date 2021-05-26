import React from "react";
import {Route, Switch} from "react-router-dom";

import Comment from "./comment"
import Exact from "./exact"

function Passport() {

    return (
        <div>
            <Switch>
                <Route path={'/example/comment'} component={Comment}/>
                <Route path={'/example/exact'} component={Exact}/>
            </Switch>
        </div>
    )
}

export default Passport;