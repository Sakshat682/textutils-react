import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("Uppercase was clicked: " +  text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase", "success");
  };

  const handleLoClick = () => {
    // console.log("Uppercase was clicked: " +  text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase", "success");
  };
  const handleClearClick = () => {
    // console.log("Uppercase was clicked: " +  text);
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared", "success");
  };

  const handleOnChange = (event) => {
    // console.log("On change");
    // console.log(event);
    setText(event.target.value);
  };
  const [text, setText] = useState("");
  const [copyBtnText, setCopyBtnText] = useState("Copy");
  const handleCopyClick = async () => {
    navigator.clipboard.writeText(text);
    if ((await navigator.clipboard.readText()) === text) {
      setCopyBtnText("Copied");
      setTimeout(() => {
        setCopyBtnText("Copy");
      }, 1000);
    }
    props.showAlert("Text Copied", "success");
  };

  const handleExtraSpaces = () => {
    setText(text.split(/[ ]+/).join(" "));
    props.showAlert("Extra spaces Removed", "success");
  };

  // text = "new text"; // Wrong way to change the state
  // setText("new text"); // Correct way to change the state
  return (
    <div>
      <h1>{props.heading}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
          style={{
            backgroundColor: props.mode === "light" ? "white" : "grey",
            color: props.mode === "light" ? "black" : "white",
          }}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUpClick}>
        Convert to Uppercase
      </button>
      <button className="btn btn-primary mx-3" onClick={handleLoClick}>
        Convert to Lowercase
      </button>
      <button className="btn btn-primary" onClick={handleClearClick}>
        Clear text
      </button>
      <button className="btn btn-primary mx-3" onClick={handleCopyClick}>
        {copyBtnText}
      </button>
      <button className="btn btn-primary" onClick={handleExtraSpaces}>
        Clear Extra Spaces
      </button>
      <div className="container my3">
        <h1>Your text summary</h1>
        <p>
          {text.split(" ").filter((t) => t !== "").length} words and{" "}
          {text.length} characters.
        </p>
        <p>
          {0.008 * text.split(" ").filter((t) => t !== "").length} Minutes read.
        </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter Something in textArea above to preview here"}
        </p>
      </div>
    </div>
  );
}
