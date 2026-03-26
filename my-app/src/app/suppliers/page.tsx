import SearchSuppliers from "./SearchSuppliers";

export default async function SuppliersPage() {
    async function fetchSuppliers(): Promise<Supplier[]> {
        try {
            const res = await fetch("http://localhost:3000/api/suppliers");
            const data = await res.json();
            console.log("Fetched suppliers:", data);
            return data;
        } catch (err) {
            console.error("Error fetching suppliers:", err);
            return [];
        }
    }
    const suppliers = await fetchSuppliers();

    return (
        <div>
            <h4>Suppliers</h4>
            <SearchSuppliers data={suppliers} />
        </div>
    )
}