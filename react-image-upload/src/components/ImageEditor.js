import "./ImageEditor.css"
import {useState} from "react";
import {uploadImageToServer} from "../services/image-service";
import {DefaultImageIcon} from "./DefaultImageIcon";

/**
 * Represents image editing and upload component
 * @return {null}
 * @constructor
 */
export function ImageEditor(props) {
    const [imageUrl, setImageUrl] = useState(null);

    let previewImage;
    if (imageUrl) {
        previewImage = <img src={imageUrl} alt="product preview" className="image-editor-preview-image"/>;
    } else {
        previewImage = <DefaultImageIcon/>;
    }

    return <div className="image-editor">
        <div className="image-editor-preview">
            {previewImage}
        </div>
        <div className="image-editor-action">
            <label className="image-editor-action-label">
                {/*We hide the input element itself, only the label remains visible, we style the label */}
                <input type="file" multiple={false} accept="image/*" className="image-editor-button" hidden={true}
                       onChange={imageChanged}/>
                Choose image
            </label>
        </div>
    </div>;

    /**
     * Handler for image input change
     * @param event The event. Files available in event.target.files
     */
    function imageChanged(event) {
        if (event.target.files.length > 0) {
            const chosenImage = event.target.files[0];
            console.log("Image changed");
            setImageUrl(URL.createObjectURL(chosenImage));
            uploadImageToServer(chosenImage, onImageUploaded, onImageUploadFailed);
        }
    }

    /**
     * Callback for image-upload success
     * @param imageId ID of the newly created image
     */
    function onImageUploaded(imageId) {
        if (props.onImageUpload) {
            props.onImageUpload(imageId);
        }
        console.log("Image uploaded");
    }

    /**
     * Callback for image upload failures
     */
    function onImageUploadFailed() {
        console.log("Image upload failed");
    }
}
