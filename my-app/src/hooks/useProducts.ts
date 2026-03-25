import axios from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

export function useProducts() {

    const controller = new AbortController();
    const [products, setProducts] = React.useState<Product[]>([]);
    useEffect(() => {
        console.log("Products mounted");
        fetchProducts();
        return () => {
            console.log("Products unmounted, aborting fetch");
            controller.abort();
        }
    }, []);

    const auth = useSelector((state: AppState) => state.auth);
    const router = useRouter();
    
    async function fetchProducts(): Promise<void> {
        console.log("fetchProducts called with auth", auth);
        if(!auth.isAuthencated) {
            console.log("User is not authenticated, redirecting to login page");
            router.push("/login");
            return;
        }
        try {
            const url = "http://localhost:9000/products";
            const secure_url = "http://localhost:9000/secure_products"
            const header = {
                Authorization: `Bearer ${auth.accessToken}`
            };
            const res = await axios.get<Product[]>(secure_url, { 
                // signal: controller.signal,
                headers: header
            });
            setProducts(res.data);
            console.log("fetched products", res.data);
        } catch (err) {
            console.error("failed to fetch products", err);
        }
    };

    return { products, fetchProducts, setProducts };
}