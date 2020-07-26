import React from "react";

export default function Button({
  text,
  loading,
  disabled,
  onClick = () => {},
  className,
  preventDefault,
}) {
  return (
    <div className={`button ${className}`}>
      <button
        href="#"
        className="white"
        disabled={loading || disabled}
        onClick={(e) => {
          preventDefault && e.preventDefault();
          onClick();
        }}
      >
        <div className="content">
          <span className="bg"></span>
          <span className="text">
            {loading ? (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              text
            )}
          </span>
        </div>
      </button>
    </div>
  );
}
