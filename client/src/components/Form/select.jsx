import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    return ( 
        <div className="form-group select">
            <select name={name} id={name} {...rest} className="form-control">
                {options.map(option =>  <option key={option._id} value={option._id}>{option.name}</option>)}
            </select>

            {error && <div className="alert alert-warning">{error}</div>}
        </div>
    );
};
 
export default Select;