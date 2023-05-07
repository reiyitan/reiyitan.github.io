import React from "react"; 
import { useState, useEffect, useRef } from "react"; 
import "./style.css"; 
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";

/**
 * A component that renders a button and a form that displays
 * when the button is clicked. 
 * 
 * The form's onSubmit will call the handleSubmit callback function
 * provided to this component and pass the event object from the submission.
 * 
 * @param title - The text to display on the button. 
 * @param placeholder - The default text to display within the input field. 
 * @param handleSubmit - Callback function to be executed on form submission.
 * @param position - CSS for positioning the component.
 * @param icon - The icon to be displayed on the button. 
 */
const Form = ({
    title,
    placeholder,
    handleSubmit,
    position,
    icon
}) => {
    const [showForm, setShowForm] = useState(false); 
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const style = {
        left: position.left,
        top: position.top
    };
    //update text within the input field
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    //focus the input field once it displays on the screen
    useEffect(() => {
        if (showForm) inputRef.current.focus();
        // eslint-disable-next-line
    }, [showForm]);

    //hide input field if user clicks off of it
    useEffect(() => {
        const handleClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowForm(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [inputRef]);

    const submit = (e) => {
        e.preventDefault();
        setValue("");
        handleSubmit(e);
    }

    return (
        <>
            <button
                id={(showForm) ? "hidden" : "form-button"}
                onClick={() => setShowForm(!showForm)}
                style={style}
            >
                <div id="icon-div">
                    {icon === "search"
                        ? <MagnifyingGlassIcon className="icon" />
                        : <PlusIcon className="icon" />
                    }
                </div>
                <span id="title-span">{title}</span>
            </button>
            <div 
                id={(showForm) ? "form-div" : "hidden"}
                style={style}
            >
                <form onSubmit={submit}>
                    <input 
                        id="form-input" 
                        type="text" 
                        placeholder={placeholder}
                        name="query"
                        value={value}
                        onChange={handleChange}
                        ref={inputRef}
                    />
                </form>
            </div>
        </>
    );
}

export default Form; 