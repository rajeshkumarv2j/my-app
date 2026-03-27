'use client';

import { useEffect, useState } from "react";
import React from "react";

export default function Counter(props: { count?: number }) {

    const [count, setCount] = useState(props.count || 0);
    const inputRef = React.useRef<HTMLInputElement>(null);
    let clickCount = 0;

    useEffect(() => {
        console.log("Count updated:", count);
    }, [count]);

    function changeFun(evt: React.ChangeEvent<HTMLInputElement>) {
        console.log("Input changed...");
        setCount(parseInt(evt.target.value) || 0);
    }

    // function updateVal() {
    //     const inputElement = document.querySelector('input[placeholder="update the counter"]') as HTMLInputElement;
    //     if (inputElement) {
    //         setCount(parseInt(inputElement.value) || 0);
    //     }
    // }


    return (
        <div>
            <h1>Counter Component</h1>
            <p>This is a simple counter component.</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount((prevCount) => prevCount + 5)}>++</button>
            <button onClick={() => setCount((prevCount) => prevCount - 1)}>--</button>

            <br />
            <div><input type="number" value={count} onChange={changeFun} /></div>

            <div>
                <input type="number" placeholder="update the counter" ref={inputRef} />
                {/* <button onClick={updateVal}>Update Count</button> */}
                <button onClick={() => { setCount(inputRef.current?.valueAsNumber || 0)}}>Update Count</button>
            </div>
        </div>
    );
}   