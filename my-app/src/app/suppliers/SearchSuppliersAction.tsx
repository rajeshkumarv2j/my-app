"use client";

import { sayHello } from "@/actions/hello";
import { JSX, useEffect, useState } from "react";

type SearchSuppliersActionsProps = {
    suppliers: (q: string) => Promise<JSX.Element | null>
}
export default function SearchSuppliersActions({ suppliers }: SearchSuppliersActionsProps) {
    const [searchText, setSearchText] = useState("");
    const [messegeView, setMessegeView] = useState<JSX.Element | null>(null);
    const [suppliersView, setSuppliersView] = useState<JSX.Element | null>(null);


    async function search() {
        const result = await sayHello(searchText);
        setMessegeView(result);
        const suppliersJSX = await suppliers(searchText); 
        setSuppliersView(suppliersJSX);
    }

    useEffect(() => {
        async function getSuppliers() {
            const suppliersJSX = await suppliers("");
            setSuppliersView(suppliersJSX);
        }
        getSuppliers();
    }, []);

    return (
        <div>
            <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <br />
            <button className="btn btn-success" onClick={search}>
                Search
            </button>
            {searchText ? (
                <div className="alert alert-info">Searching for {searchText}</div>
            ) : null}
            <div>{messegeView}</div>

            <div>{suppliersView}</div>
        </div>
    );
}