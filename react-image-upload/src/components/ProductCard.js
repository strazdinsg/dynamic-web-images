import "./ProductCard.css"
import {DeleteButton} from "./DeleteButton";
import {EditButton} from "./EditButton";
import productImage from "../img/products/1.jpg"
import {useState} from "react";
import {SaveButton} from "./SaveButton";

/**
 * A component representing a single product card
 * @param props Properties containing the product object
 * @return {JSX.Element}
 * @constructor
 */
export function ProductCard(props) {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [description, setDescription] = useState(props.product.description);
    const [imageId, setImageId] = useState(props.product.imageId);

    // Select the elements based on whether it is Edit-mode, or Read-only mode
    let titleElement;
    let priceElement;
    let descriptionElement;
    let editButton;
    let deleteButton;
    let imageElement;
    if (editMode) {
        titleElement = <div className="product-card-editable">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name-input" placeholder="Name" value={name}
                   onChange={(event) => setName(event.target.value)}/>
        </div>;
        priceElement = <div className="product-card-editable">
            <label htmlFor="name-input">Price:</label>
            <input type="text" id="price-input" placeholder="Price" value={price}
                   onChange={(event) => setPrice(event.target.value)}/>
        </div>;
        descriptionElement = <div className="product-card-editable">
            <label htmlFor="description-input">Description:</label>
            <textarea id="description-input" placeholder="Description" value={description}
                      onChange={(event) => setDescription(event.target.value)}/>
        </div>;
        editButton = <SaveButton clickFunction={saveProduct}/>;
    } else {
        imageElement = <img src={productImage} alt="product"/>;
        titleElement = <h2 className="product-card-title">{name}</h2>;
        priceElement = <h3 className="product-card-price">{price} Kr</h3>;
        descriptionElement = <div className="product-card-description">{description}</div>;
        editButton = <EditButton clickFunction={toggleEditing}/>;
        deleteButton = <DeleteButton clickFunction={deleteProduct}/>;
    }

    return <div className="product-card">
        <section className="product-card-image">
            {imageElement}
        </section>
        <section className="product-card-content">
            {titleElement}
            {priceElement}
            {descriptionElement}
        </section>
        <section className="product-card-actions">
            {editButton}
            {deleteButton}
        </section>
    </div>;

    /**
     * This function is called when the user clicks on "Delete"
     */
    function deleteProduct() {
        // Call the deletion-function, received from the parent component
        props.deleteFunction(props.product);
    }

    /**
     * Toggle the "Edit mode"
     */
    function toggleEditing() {
        setEditMode(!editMode);
    }

    /**
     *
     */
    function saveProduct() {
        const newProduct = {
            "id": props.product.id,
            "name": name,
            "price": price,
            "description": description,
            "imageId": imageId
        };
        props.saveFunction(newProduct);
        toggleEditing();
    }
}