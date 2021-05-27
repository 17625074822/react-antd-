import React from "react";
import {Route, Switch} from "react-router-dom";
import Index from "./components";

function FontSize() {

    return (
        <div>
            <Switch>
                {/*<Route path={'/passport/customer/create'} component={Create}/>*/}
                <Route exact path={'/example/fontSize'} component={Index}/>
            </Switch>
        </div>
    )
}

export default FontSize;