import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <>
                <div className='footer'>
                    <span><a href=''>关于我们</a></span>
                    <span><a href=''>使用条款</a></span>
                    <span><a href=''>帮助文档</a></span>
                </div>
                {/*<div className='background'>*/}
                {/*    /!*<div className='png1'><img src={require("../../img/1.png")}/></div>*!/*/}
                {/*    <div className='png2'><img src={require("../../img/2.png")}/></div>*/}
                {/*</div>*/}
            </>
        );
    }
}


export default Footer;