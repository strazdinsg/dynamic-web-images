// Here we manage the Redux store slice responsible for holding product state

import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
        name: "products",
        initialState: {
            products: [],
            tempProduct: null
        },
        reducers: {
            /**
             * Set the products in the store
             * @param state Current Redux store state
             * @param action The product array
             */
            setProducts: function (state, action) {
                state.products = action.payload;
            },
            /**
             * Update a product in the store
             * @param state Current Redux store state
             * @param action The product, which must have the right ID
             */
            updateProduct: function (state, action) {
                const productIndex = state.products.findIndex(product => product.id === action.payload.id);
                if (productIndex >= 0 && productIndex < state.products.length) {
                    state.products[productIndex] = action.payload;
                }
            },
            /**
             * Remove the product from the state variable
             * @param state Current Redux store state
             * @param action contains the ID of the product to remove
             */
            removeProduct: function (state, action) {
                const productId = action.payload;
                state.products = state.products.filter(product => product.id !== productId);
            },
            /**
             * Set the temporary object (which will be added to the database)
             * @param state
             * @param action
             */
            addTempProduct: function(state, action) {
                state.tempProduct = action.payload;
            },
            /**
             * Set ID of newly added product, add it to the product array
             * @param state
             * @param action
             */
            setIdOfAddedProduct: function(state, action) {
                if (state.tempProduct) {
                    const addedProduct = {...state.tempProduct};
                    addedProduct.id = action.payload;
                    state.products = [...state.products, addedProduct];
                    state.tempProduct = null;
                }
            }
        }
    }
);

export const {setProducts, removeProduct, updateProduct, addTempProduct, setIdOfAddedProduct} = productSlice.actions;
export default productSlice.reducer;
