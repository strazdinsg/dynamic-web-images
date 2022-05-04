import {ActionButton} from "./ActionButton";

/**
 * Button for editing an object
 * @param props which must include clickFunction - reference to a function to be called when button is clicked
 * @return {JSX.Element}
 * @constructor
 */
export function EditButton(props) {
    return <ActionButton clickFunction={props.clickFunction}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
    </ActionButton>;
}
