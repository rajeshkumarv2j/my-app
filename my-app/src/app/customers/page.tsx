import { Metadata } from "next";
import { Customer } from "../models/Customer";
import Link from "next/link";
import { time } from "console";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Customers Page",
    description: "This is the customers page.",
    keywords: ["customers", "list", "page"]
};

export default async function CustomerListing() {
       await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
       
 <div>
            <h1>Customers Listing</h1>
            {/* <Suspense fallback={<div>Loading customers...#1</div>}>
                <Customers timeout={5000}/>
            </Suspense> */}
            <Suspense fallback={<div>Loading customers...#2</div>}>
                <Customers timeout={7000}/>
            </Suspense>
            <Suspense fallback={<div>Loading customers...#3</div>}>
                <Customers timeout={9000}/>
            </Suspense>
        </div>
    )
}

export async function Customers({ timeout = 3000 }: { timeout?: number }) {
   await new Promise((resolve) => setTimeout(resolve, timeout));
    console.log("rendering customers...");

    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${url}/customers`, {
        method: "GET", cache: "no-store"
    });
    const customers = await response.json() as Customer[];

    return (
        <div>
            <h1>Customers</h1>
            <p>This is the customers page.</p>
            <ul>
                {customers.map((customer: Customer) => (
                    <li key={customer.id}><Link href={`/customers/${customer.id}`}>{customer.name} - {customer.location}</Link></li>
                ))}
            </ul>
        </div>
    );
}

export const dynamic = "force-dynamic";