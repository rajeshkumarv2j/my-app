import { Customer } from "@/app/models/Customer";
import { Metadata } from "next";

export async function generateMetadata(props: CustomerDetailsProps): Promise<Metadata> {

    const  id  = (await props.params).id;
    const url = `${process.env.BASE_URL}/customers/${id}`;
    const response = await fetch(url, {
        method: "GET"
    });
    const customer = await response.json() as Customer;


    return {
        title: `Customer Details ${customer.name}`,
        description: "This is the customer details page.",
        keywords: ["customer", "details", "page"]  
    }
}


type CustomerDetailsProps = {
    params: Promise<{ id: string }>
}

export default async function CustomerDetails(props: CustomerDetailsProps) {

    console.log("rendering customer details ...");
    const  id  = (await props.params).id;
    const url = `${process.env.BASE_URL}/customers/${id}`;
    const response = await fetch(url, {
        method: "GET"
    });
    const customer = await response.json() as Customer;
    return (
        <div>
            <h1>Customer Details</h1>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Location:</strong> {customer.location}</p>
        </div>
    );
}