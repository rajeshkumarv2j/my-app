import React, { memo } from "react";
import productStyles from "./products.module.css";


type ProductViewProps = {
    product: Product;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
};

export const ProductView: React.FC<ProductViewProps> = React.memo(function ProductViewFC({ product, onDelete, onEdit }) {
    console.log("Rendering ProductView for product", product.id);
    return (
            <div key={product.id} className={productStyles.product}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <img src={product.imageUrl} alt={product.name} className={productStyles.productImage} />
                <div>
                    <button onClick={() => onEdit?.(product.id)}>
                        Edit
                    </button>
                    &nbsp;
                    <button onClick={() => onDelete?.(product.id)}>
                        Delete
                    </button>
                </div>
                </div>
    );
});