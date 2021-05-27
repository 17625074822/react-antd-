import React from 'react';

function Index(props) {
    return (
        <div>
            <p style={{fontSize: "4rem"}}>4rem的字体,会随着页面的缩放而动态变化</p>
            <p style={{fontSize: "1.5em"}}>1.5em的字体</p>
        </div>
    );
}

export default Index;