import React, {Component} from 'react'
import './style.less'

class SearchArea extends Component {
    render() {
        return (
            <div className={'SearchArea'}>
                {this.props.children}
                <div style={{clear: "both"}}></div>
            </div>
        )
    }
}

export default SearchArea