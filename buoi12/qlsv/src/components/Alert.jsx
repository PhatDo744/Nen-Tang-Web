import React from "react";

const Alert = ({ message, type}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            <span>{message}</span>
            <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="alert" 
            aria-label="Close"
            >
            </button>
        </div>
    )
}

export default Alert;