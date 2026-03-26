import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

type Supplier = {
    id: number;
    name: string;
    contactPerson: string;
    email: string;
    location: string;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    console.log("Received GET request with query:", query);

    const filepath = path.join(process.cwd(), "data", "suppliers.json");
    const suppliers = JSON.parse(fs.readFileSync(filepath, "utf-8")) as Supplier[];
    if(!query) {
        return NextResponse.json(suppliers);
    }else {
        const filteredSuppliers = suppliers.filter(supplier => 
            supplier.name.toLowerCase().includes(query.toLowerCase()) ||
            supplier.contactPerson.toLowerCase().includes(query.toLowerCase()) ||
            supplier.email.toLowerCase().includes(query.toLowerCase()) ||
            supplier.location.toLowerCase().includes(query.toLowerCase())
        );
        return NextResponse.json(filteredSuppliers);
    }
    
}