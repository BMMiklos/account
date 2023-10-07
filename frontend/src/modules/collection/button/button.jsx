import "./button.css";

export function Button(props) {
    return <button className="aae-button" {...props}>{props.children}</button>
}
