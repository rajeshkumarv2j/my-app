import { CartItem } from "../app/models/CartItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GadgetState = {
    cart: CartItem[],
    
}
const initialState: GadgetState = {
    cart: [],
    
}

//action: {type: "addtocart", payload: CartItem}
//action: {type: "removeitem", id: 1}
// export const gadgetsReducer = (state=initialState, action) => {

//     if(action.type === "addtocart" && action.payload){

//         //state.cart.push(action.payload);
//         const cart = [...state.cart];
//         cart.push(action.payload);
//         return {
//             ...state,
//             cart: cart,
//         }
//     }
//     return state;
// }

const gadgetsSlice = createSlice({
    name: "gadgetsSlice",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cart.push(action.payload);
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const cart = state.cart.filter((item) => item.product.id !== action.payload);
            state.cart = cart;
        }
    }
});

export const { addToCart } = gadgetsSlice.actions;
export const { removeCartItem } = gadgetsSlice.actions;
export const gadgetsReducer = gadgetsSlice.reducer;
