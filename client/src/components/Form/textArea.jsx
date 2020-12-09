import React from 'react';

const textArea = ({ name, label, onChange, value, rows, error }) => {
    return(
        <div className="form-group textarea">
            <label htmlFor={name}>{label}</label>
            <textarea 
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"  
                rows={rows} 
            ></textarea>

            {error && <div className="alert alert-warning mt-2">{error}</div>}
        </div>
    );
}

export default textArea;