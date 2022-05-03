import "./ActionButton.css"

/**
 * Represents an action button
 * @param props, which must contain the following properties:
 *   clickFunction - reference to a function to be called when the button is clicked
 *   children - the content to show inside the button (SVG path)
 * @return {JSX.Element}
 * @constructor
 */
export function ActionButton(props) {
    return <div className="action-button" onClick={props.clickFunction}>
        {/* Icon from https://heroicons.com/ */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth={2}>
            {props.children}
        </svg>
    </div>;
}
