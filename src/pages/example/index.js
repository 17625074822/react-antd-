import React from "react";
import {Route, Switch} from "react-router-dom";

import Comment from "./comment"
import Exact from "./exact"
import FontSize from "./fontSize"
import Flex from "./flex"

function Example() {

    return (
        <div>
            <Switch>
                <Route path={'/example/comment'} component={Comment}/>
                <Route path={'/example/exact'} component={Exact}/>
                <Route path={'/example/fontSize'} component={FontSize}/>
                <Route path={'/example/flex'} component={Flex}/>
            </Switch>
        </div>
    )
}

export default Example;