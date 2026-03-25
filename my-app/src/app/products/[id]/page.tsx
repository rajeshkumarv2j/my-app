'use client';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const params = useParams();
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        console.log("EditProduct mounted with id", params.id);
        fetchProduct();
    }, [params.id]);

    async function fetchProduct(): Promise<void> {
        try {
            const res = await axios.get<Product>(`http://localhost:9000/products/${params.id}`);
            setProduct(res.data);
            console.log("fetched product", res.data);
        } catch (err) {
            console.error("failed to fetch product", err);
        }
    }

    async function updateProduct(product: Product): Promise<void> {
            
            try {
              
                await axios.put(`http://localhost:9000/products/${product.id}`, product);
                // setProducts(prevProducts => prevProducts.map(product => product.id === id ? updatedProduct : product));
                router.push(`/products`);
            } catch (err) {
                console.error("failed to update product", err);
            }
        }

    return (
        <div>
            <h4>Edit Product</h4>
            <p>Editing product with ID: {params.id}</p>

            <div>
                <form onSubmit={e=> {
                    e.preventDefault();
                    if (product) {
                        updateProduct(product);
                    }
                }}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={product?.name || ""}
                            onChange={event1 => setProduct({...product, name: event1.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" name="price" value={product?.price || 0}
                            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={product?.description || ""}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={product?.imageUrl || ""}
                            onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })} />
                    </div>
                    <button type="submit">Update Product</button> &nbsp;
                    <button type="button" onClick={() => router.push("/products")}>Cancel</button>
                </form>
                
            </div>
        </div>

    );
}