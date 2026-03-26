'use client';

import React from "react";

type SearchSuppliersProps = {
    data: Supplier
}

export default function SearchSuppliers({ data }: SearchSuppliersProps) {

    const [data1, setData1] = React.useState(data);

    async function searchSuppliers(query: string): Promise<void> {
        try {
            const res = await fetch(`http://localhost:3000/api/suppliers?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            console.log("Search results:", data);
            setData1(data); 
        } catch (err) {
            console.error("Error searching suppliers:", err);
        }
    }

    return (
        <div>
           <input type="text" placeholder="Search suppliers..." className="form-control mb-3" />
           <button className="btn btn-primary mb-3" onClick={() => searchSuppliers((document.querySelector('input') as HTMLInputElement).value)}>Search</button>
              <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {data1.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.contactPerson}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}