import React from "react";
import {Route, Switch} from "react-router-dom";
import Index from "./components";

function Flex() {

    return (
        <div>
            <Switch>
                {/*<Route path={'/passport/customer/create'} component={Create}/>*/}
                <Route exact path={'/example/flex'} component={Index}/>
            </Switch>
        </div>
    )
}

export default Flex;