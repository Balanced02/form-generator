import React, { useState } from "react";
import MultiSelect from "./MultiSelect";

export default function Input({
  id,
  type = "text",
  name,
  value,
  onChange,
  label,
  errorMessage,
  options,
  max,
  min,
  allowMultiple,
  disabled,
  showOnInput,
  accept,
}) {
  const [inputType, setInputType] = useState(type);

  const inputFocused = () => {
    if (type === "password" && showOnInput) {
      setInputType("text");
    }
  };

  const inputBlurred = () => {
    if (type === "password") {
      setInputType(type);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={id || name}>{label}</label>
      {type === "select" ? (
        <div>
          <MultiSelect
            optionsList={options}
            selectName={name}
            onChange={onChange}
            placeholder={label}
            selectState={value}
            className={errorMessage ? "error" : ""}
            allowMultiple={allowMultiple}
            disabled={disabled}
          />
        </div>
      ) : (
        <input
          type={inputType}
          id={id || name}
          className={errorMessage ? "error" : ""}
          name={name}
          value={value}
          datamask="*"
          onChange={onChange}
          max={max}
          min={min}
          disabled={disabled}
          onFocus={inputFocused}
          onBlur={inputBlurred}
          accept={accept}
        />
      )}
      <span className="error">{errorMessage}</span>
    </div>
  );
}
