import {ActionButton} from "./ActionButton";

/**
 * Button for deleting an object
 * @param props which must include clickFunction - reference to a function to be called when the button is clicked
 * @return {JSX.Element}
 * @constructor
 */
export function DeleteButton(props) {
    return <ActionButton clickFunction={props.clickFunction}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
    </ActionButton>;
}
