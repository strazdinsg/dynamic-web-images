import {useEffect, useState} from "react";
import {ProductCard} from "./components/ProductCard";
import {
    deleteProductImageOnServer,
    deleteProductOnServer,
    loadProductsFromServer,
    saveProductOnServer
} from "./services/product-service";

/**
 * A component representing the whole application
 * @return {JSX.Element}
 * @constructor
 */
export function App() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Call loadProducts() on every re-render of the component (including the first one)
    useEffect(loadProducts);

    let content;
    if (error) {
        content = <h1>{error}</h1>;
    } else if (isLoading) {
        content = <p>Loading...</p>;
    } else {
        content = (
            <>
                {
                    products.map(product => <ProductCard
                        product={product} key={product.id}
                        deleteFunction={deleteProduct}
                        editFunction={showProductEditForm}
                        saveFunction={saveProduct}
                    />)
                }
            </>
        );
    }

    return <main>{content}</main>;

    /**
     * Load products from the backend
     */
    function loadProducts() {
        if (products.length === 0 && !isLoading && !error) {
            setIsLoading(true);
            console.log("Loading products");
            loadProductsFromServer(onProductsReceived, onProductLoadError);
        }
    }

    /**
     * Products received from the backend API
     * @param products
     */
    function onProductsReceived(products) {
        setIsLoading(false);
        if (Array.isArray(products)) {
            console.log("Products received");
            setProducts(products);
        } else {
            setError("Could not load products");
            setProducts([]);
        }
    }

    /**
     * Could not load products from the backend
     * @param status HTTP status code
     * @param responseText Received response text
     */
    function onProductLoadError(status, responseText) {
        setError("Could not load products from the server");
    }

    /**
     * Delete all information related to a specific product from both the application state and the server
     * @param product
     */
    function deleteProduct(product) {
        if (product.imageId) {
            deleteProductImageOnServer(product.imageId, onImageDeleted);
        }
        deleteProductOnServer(product.id, onProductDeleted);
        removeProductFromState(product.id);
    }

    /**
     * Remove the product from the state variable
     * @param productId
     */
    function removeProductFromState(productId) {
        setProducts(products.filter(product => product.id !== productId));
    }

    /**
     * Show edit-form for the product
     * @param product
     */
    function showProductEditForm(product) {
        console.log("Show edit-form for product " + product.id);
    }

    function saveProduct(product) {
        console.log(`Saving product...`);
        saveProductOnServer(product, onProductSaved);
    }

    /**
     * This function is called when response from the server says "Image on the server deleted"
     */
    function onImageDeleted() {
        console.log("Image deleted on the server");
    }

    /**
     * This function is called when response from the server says "Product data saved"
     */
    function onProductSaved() {
        console.log("Product saved on server!");
    }

    function onProductDeleted(product) {
        console.log("Removed product " + product.id);
    }
}
