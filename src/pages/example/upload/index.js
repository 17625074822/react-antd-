import React from "react";
import {Route, Switch} from "react-router-dom";
import Index from "./components";
import DrawerDemo from "./components";

function Flex() {

    return (
        <div>
            <Switch>
                {/*<Route path={'/passport/customer/create'} component={Create}/>*/}
                <Route exact path={'/example/flex'} component={Index}/>
                <Route exact path={'/example/drawer'} component={DrawerDemo}/>
                <Route exact path={'/example/upload'} component={DrawerDemo}/>
            </Switch>
        </div>
    )
}

export default Flex;