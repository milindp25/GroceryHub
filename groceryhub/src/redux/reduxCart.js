import {createSlice} from '@reduxjs/toolkit';
import { useId } from 'react'



const cartSlice = createSlice({
    name: "cart",
    initialState : {
        id : 0,
        products :[],
        quantity : 0,
        total :0,
        size : 0,
    },
    reducers :{
        addProduct :(state,action) => {
            state.id += 1;
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += (action.payload[0].prod_price * action.payload.cartedQuantity);
            state.size +=1;
    },
        clearCart :(state) => {
            state.id = 0;
            state.quantity =0;
            state.products = [];
            state.total = 0;
            state.size = "";
    },
    removeCart :(state,action) => {
       const index = action.payload.products.findIndex((cartItem) => cartItem.cartId === action.payload.cartId);
       let temp = action.payload.products.filter(function(item) {
            return item.cartId != action.payload.cartId
        })
        if(action.payload.products.length == 1){
            state.id = 0;
            state.quantity =0;
            state.products = [];
            state.total = 0;
            state.size = "";
        }
        else {
            let oldProd = action.payload.products[index];
            let newTotal = state.total - (oldProd[0].prod_price * oldProd.cartedQuantity)
            state.total = newTotal.toFixed(2);
            state.quantity -=1;
            let temp = action.payload.products.filter(function(item) {
                return item.cartId != action.payload.cartId
            })
            //action.payload.products.splice(index,1);
            state.products = temp;
        }
    },
    reduceQuantity : (state,action) => {
        const index = action.payload.products.findIndex((cartItem) => cartItem.cartId === action.payload.cartId);
        let prod = [];
        for (var i in action.payload.products[index]){
            prod[i] = action.payload.products[index][i];
        }
        let temp = action.payload.products.filter(function(item) {
            return item.cartId != action.payload.cartId
        });
        prod['cartedQuantity'] -= 1;
        let newTotal = parseFloat(state.total) - (prod[0].prod_price);
        state.total = newTotal.toFixed(2);
        state.quantity -=1;
        state.products = temp;
        temp = temp.push(prod);
        
    },
    increaseQuantity : (state,action) => {
        const index = action.payload.products.findIndex((cartItem) => cartItem.cartId === action.payload.cartId);
        let prod = [];
        for (var i in action.payload.products[index]){
            prod[i] = action.payload.products[index][i];
        }
        let temp = action.payload.products.filter(function(item) {
            return item.cartId != action.payload.cartId
        });
        prod['cartedQuantity'] += 1;
        let newTotal = parseFloat(state.total) + (prod[0].prod_price);
        state.total = newTotal.toFixed(2);
        state.products = temp;
        temp = temp.push(prod);
        
    }
  },
});

export const { addProduct,clearCart,removeCart,reduceQuantity,increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
