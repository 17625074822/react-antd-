import React, {Component} from 'react';
import "./style.less"

class PageTop extends Component {
    render() {
        return (
            <div className="PageTop">
                <div className="title">
                    <span className="icon"></span>{this.props.title}
                </div>
                <div className="actions">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PageTop;