import React, {Component} from 'react';
import {Row, Col} from "antd";
import "./style.less"

class PageBottom extends Component {
    // componentWillMount() {
    //     common.consoleLog(this.props.children)
    //     common.consoleLog(this.props.pagination)
    // }

    render() {
        return (
            <Row className="PageBottom">
                {this.props.children !== undefined &&
                <Col flex={12}>
                    {this.props.children}
                </Col>}
                <Col flex={this.props.children === undefined ? 24 : 12} className="actions">
                    {this.props.pagination}
                </Col>
            </Row>
        );
    }
}

export default PageBottom;