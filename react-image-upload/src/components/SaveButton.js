import {ActionButton} from "./ActionButton";

/**
 * Button for saving an object
 * @param props which must include clickFunction - reference to a function to be called when the button is clicked
 * @return {JSX.Element}
 * @constructor
 */
export function SaveButton(props) {
    return <ActionButton clickFunction={props.clickFunction}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
    </ActionButton>;
}
