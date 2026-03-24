'use client';

import axios from "axios";
import { use, useEffect, useState } from "react";
import productStyles from "./products.module.css";
import { useRouter } from "next/navigation";

export default function Products() {

    const [products, setProducts] = useState<Prodcut[]>([]);
    const router = useRouter();
    
    useEffect(() => {
            console.log("Products mounted");
            fetchProducts();
    }, []);
    
        async function editProduct(id: number): Promise<void> {
            router.push(`/products/${id}`);
            // try {
            //     const updatedProduct: Prodcut = {
            //         id,
            //         name: "Updated Product Name",
            //         price: 0,
            //         description: "",
            //         imageUrl: ""
            //     };
            //     await axios.put(`http://localhost:9000/products/${id}`, updatedProduct);
            //     // setProducts(prevProducts => prevProducts.map(product => product.id === id ? updatedProduct : product));
            //     const copyProducts = [...products];
            //     const index = copyProducts.findIndex(product => product.id === id);
            //     if (index !== -1) {
            //         copyProducts[index] = updatedProduct;
            //         setProducts(copyProducts);
            //     }
            // } catch (err) {
            //     console.error("failed to update product", err);
            // }
        }

        async function deleteProduct(id: number): Promise<void> {
            try {
                await axios.delete(`http://localhost:9000/products/${id}`);
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            } catch (err) {
                console.error("failed to delete product", err);
            }      
        }

        async function fetchProducts(): Promise<void> {  
            try {
                const res = await axios.get<Prodcut[]>("http://localhost:9000/products");
                setProducts(res.data);
                    console.log("fetched products", res.data);
                } catch (err) {
                    console.error("failed to fetch products", err);
                }
            };
        

        return (
            <div>
                <h1>Products List</h1>
                <p>This is the products page.</p>
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                    {products.map(product => (
                        <div key={product.id} className={productStyles.product}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <img src={product.imageUrl} alt={product.name} className={productStyles.productImage} />
                            <button className={productStyles.productButton} onClick={() => editProduct(product.id)}>
                                Edit
                            </button>
                            &nbsp;
                            <button className={productStyles.productButton} onClick={() => deleteProduct(product.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                {/* <div className={productStyles.productTableContainer}>
                    <table className={productStyles.productTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td><img src={product.imageUrl} alt={product.name} className={productStyles.productImage} /></td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                </div> */}
            </div>
        );
    }
        