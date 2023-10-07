import "./textarea.css";

export function Textarea(props) {
    return <textarea className="aae-textarea" {...props}>{props.children}</textarea>    
}
