'use client';

import Counter from "./Counter";

export default function Hello(props: { message?: string; color?: string }) {
    console.log("Hello component rendered");

    console.log("Props...", props);

    function calculateTotal(): string {
        return "Total: $1.00";
    }

    return (
        <div>
            <h1>Hello Component!</h1>
            <p>This is a simple React functional component.</p>
            <p> Generated at {new Date().toLocaleString()} </p>
            <p> {calculateTotal()} </p>
            <p style={{ color: props.color }}>{props.message}</p>
            <Counter count={10} />
            {/* <Counter count={5} /> */}
        </div>
    )
}