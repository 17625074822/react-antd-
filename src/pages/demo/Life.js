import React, { useState } from 'react';
import "./index.less"
function Life() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div>
            <p className={"content"}>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me1
            </button>
        </div>
    );
}

export default Life;