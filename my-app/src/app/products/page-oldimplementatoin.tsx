'use client';

import axios from "axios";
import React, { use, useEffect, useState } from "react";
import productStyles from "./products.module.css";
import { useRouter } from "next/navigation";
import { ProductView } from "./ProductView";
import { useTitle } from "@/hooks/useTitle";

export default function Products() {

    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    

    useEffect(() => {
            console.log("Products mounted");
            fetchProducts();
    }, []);

    // useEffect(() => {
    //         document.title = document.title + `Products Page`;
    //     }, []);
        useTitle("Products Page");
    
    const calculateTotalPrice = React.useMemo(() => {
        console.log("Calculating total price for products");
        return products.reduce((total, product) => total + product.price, 0);
    }, [products]);

        const editProduct = React.useCallback( async function editProduct(id: number): Promise<void> {
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
        }, [products]);

        const deleteProduct = React.useCallback( async function deleteProduct(id: number): Promise<void> {
            try {
                await axios.delete(`http://localhost:9000/products/${id}`);
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            } catch (err) {
                console.error("failed to delete product", err);
            }      
        }, [products]);

        async function fetchProducts(): Promise<void> {  
            try {
                const res = await axios.get<Product[]>("http://localhost:9000/products");
                setProducts(res.data);
                    console.log("fetched products", res.data);
                } catch (err) {
                    console.error("failed to fetch products", err);
                }
            };
        

        return (
            <div>
                <h1>Products List</h1>
                <div>Total Price: ${calculateTotalPrice}</div>
                {isMessageVisible && <p className={productStyles.message}>This is a message that can be toggled.</p>}
                <button onClick={() => setIsMessageVisible(!isMessageVisible)}>
                    {isMessageVisible ? "Hide Message" : "Show Message"}
                </button>
               

                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                    {products.map(product => {

                        return <ProductView key={product.id} product={product} onDelete={deleteProduct} onEdit={editProduct} />;
                    })}
                </div>
                
            </div>
        );
    }
        