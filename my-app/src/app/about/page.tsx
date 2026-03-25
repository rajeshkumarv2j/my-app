'use client';
import { useTitle } from "@/hooks/useTitle";
import { useEffect } from "react";

export default function About() {
        // useEffect(() => {
        //     document.title = document.title + `About Page`;
        // }, []);
    useTitle("About Page");

    return (
        <div>
            <h1>About</h1>
            <p>This is the about page.</p>
        </div>
    );
}