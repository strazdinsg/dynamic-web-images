import {useEffect, useState} from "react";
import {ProductCard} from "./components/ProductCard";
import {
    addProductOnServer,
    deleteProductOnServer,
    loadProductsFromServer,
    updateProductOnServer
} from "./services/product-service";
import {deleteImageOnServer} from "./services/image-service";
import {AddProductButton} from "./components/AddProductButton";
import {useDispatch, useSelector} from "react-redux";
import {setProducts, removeProduct, setIdOfAddedProduct, addTempProduct, updateProduct} from "./redux/productSlice";

/**
 * A component representing the whole application
 * @return {JSX.Element}
 * @constructor
 */
export function App() {
    const products = useSelector(state => state.productStore.products);
    const dispatch = useDispatch();
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [loadingInProgress, setLoadingInProgress] = useState(false);
    const [error, setError] = useState(null);
    const [addFormVisible, setAddFormVisible] = useState(false);

    // Call loadProducts() on every re-render of the component (including the first one)
    useEffect(loadProducts);

    let content;
    if (error) {
        content = <h1>{error}</h1>;
    } else if (loadingInProgress) {
        content = <p>Loading...</p>;
    } else if (products.length === 0) {
        content = <p>No products in the database!</p>;
    } else {
        content = <>
            {
                products.map(product => <ProductCard
                    product={product} key={product.id}
                    deleteFunction={deleteProduct}
                    saveFunction={saveProduct}
                />)
            }
        </>;
    }

    let productAddButton;
    if (productsLoaded && !addFormVisible) {
        productAddButton = <AddProductButton clickFunction={showProductAddForm}/>;
    }
    let productAddForm;
    if (addFormVisible) {
        productAddForm = <ProductCard
            product={createEmptyProduct()}
            addFunction={addProduct}
        />;
    }

    return <main>
        {content}
        {productAddForm}
        {productAddButton}
    </main>;

    /**
     * Load products from the backend
     */
    function loadProducts() {
        if (!productsLoaded && !loadingInProgress && !error) {
            console.log("Loading products");
            setLoadingInProgress(true);
            loadProductsFromServer(onProductsReceived, onProductLoadError);
        }
    }

    /**
     * Products received from the backend API
     * @param products
     */
    function onProductsReceived(products) {
        setProductsLoaded(true);
        setLoadingInProgress(false);
        if (Array.isArray(products)) {
            console.log("Products received");
            dispatch(setProducts(products));
        } else {
            setError("Could not load products");
        }
    }

    /**
     * Could not load products from the backend
     * @param status HTTP status code
     * @param responseText Received response text
     */
    function onProductLoadError(status, responseText) {
        setError("Could not load products from the server");
        setLoadingInProgress(false);
    }

    /**
     * Delete all information related to a specific product from both the application state and the server
     * @param product
     */
    function deleteProduct(product) {
        if (product.imageId) {
            deleteImageOnServer(product.imageId, onImageDeleted);
        }
        deleteProductOnServer(product.id, onProductDeleted);
        dispatch(removeProduct(product.id));
    }


    /**
     * Send request to the server to add a product
     * @param product The product to add
     */
    function addProduct(product) {
        console.log("Adding product...");
        addProductOnServer(product, onProductAdded, onProductAddFailed);
        dispatch(addTempProduct(product));
    }

    /**
     * Send request to server to save data for a product
     * @param product The product to save
     */
    function saveProduct(product) {
        console.log(`Saving product...`);
        updateProductOnServer(product, onProductSaved, onProductSaveFailed);
        dispatch(updateProduct(product));
    }

    /**
     * Create an empty product
     * @return {{imageId: null, price: string, name: string, description: string, id: null}}
     */
    function createEmptyProduct() {
        return {id: null, name: "", description: "", price: "", imageId: null};
    }

    /**
     * Show the form for adding a new product
     */
    function showProductAddForm() {
        setAddFormVisible(true);
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

    /**
     * This function is called when response from the server says "Product deleted"
     */
    function onProductDeleted() {
        console.log("Removed product");
    }

    /**
     * This function is called when response from the server says "Product added"
     * @param productId Id of the newly added product
     */
    function onProductAdded(productId) {
        setAddFormVisible(false);
        dispatch(setIdOfAddedProduct(productId));
    }

    /**
     * This function is called when response from the server says "Product adding failed"
     */
    function onProductAddFailed() {
        setAddFormVisible(false);
        console.log("Product adding failed!");
    }

    /**
     * This function is called when response from the server says "Product saving failed"
     */
    function onProductSaveFailed() {
        console.log("Product saving failed!");
    }
}
