import Link from "next/link";
import SearchSuppliersActions from "./SearchSuppliersAction";

export default async function SuppliersPage() {

//     async function fetchSuppliersAsync(): Promise<Supplier[]> {
//         try {
//             const res = await fetch("http://localhost:3000/api/suppliers");
//             const data = await res.json();
//             console.log("Fetched suppliers:", data);
//             return data;
//         } catch (err) {
//             console.error("Error fetching suppliers:", err);
//             return [];
//         }
//     }
//     const suppliers = await fetchSuppliers();

    async function fetchSuppliers(q: string): Promise<Supplier[]> {
    'use server'
        let data = []
        try {
            
            const res = await fetch(`http://localhost:3000/api/suppliers?q=${q}`);
            data = await res.json();
            console.log("Fetched suppliers:", data);
            // return data;
        } catch (err) {
            console.error("Error fetching suppliers:", err);
            // return [];
        }

        return (
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
                    {data.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.contactPerson}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    // const suppliers = await fetchSuppliers();

    return (
        <div>
            <h4>Suppliers Listing</h4>

            <Link href="/suppliers/add" className="btn btn-primary mb-3">Add Supplier</Link>
            {/* <SearchSuppliers data={suppliers} /> */}
            <SearchSuppliersActions suppliers={fetchSuppliers}/>
        </div>
    )
}