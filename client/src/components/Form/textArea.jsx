import React from 'react';

const textArea = ({ name, label, onChange, value, rows, error }) => {
    return(
        <div className="form-group">
            <textarea 
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"  
                rows={rows} 
            ></textarea>
            <label htmlFor={name}>{label}</label>
            {/*Truesy Notation. If there are errors show an info box.*/}
            {error && <div className="alert alert-warning mt-2">{error}</div>}
        </div>
    );
}

export default textArea;