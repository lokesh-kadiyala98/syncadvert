import React from 'react';

const Select = ({ name, kannadaLabel, label, options, error, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{kannadaLabel} <br/> {label}</label>
            {/*In react, to access an html element value. We use ref, a JSX attr 
            instead of document object as in plain javascript. */}
            <select name={name} id={name} {...rest} className="form-control">
                <option value="" />
                {options.map(option =>  <option key={option[0]._id} value={option[0]._id}>{option[0].name}</option>)}
            </select>
            {/*Truesy Notation. If there are errors show an info box.*/}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};
 
export default Select;