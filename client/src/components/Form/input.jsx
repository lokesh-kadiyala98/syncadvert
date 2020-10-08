import React, { useState } from 'react';

const Input = ({ type, name, label, value, error, onChange, placeholder }) => {

    const [showPassword, tooglePassword] = useState(false)

    return ( 
        <React.Fragment>
            <div className="form-element">
                {type === 'password' ?
                    <input type={showPassword ? 'text' : 'password'} name={name} value={value} 
                        placeholder={placeholder} onChange={onChange} id={name} required 
                    />
                    :
                    <input type={type} name={name} value={value} 
                        placeholder={placeholder} onChange={onChange} id={name} required 
                    />
                }
                <label htmlFor={name} className="label-name">
                    <span className="content-name">
                        {label}
                    </span>
                </label>
                {type === 'password' ? <i onClick={() => tooglePassword(!showPassword)} className="fa fa-eye password-toogler"></i> : ''}
            </div>
            {error && <div className="alert alert-warning">{error}</div>}
        </React.Fragment>
    );
}
 
export default Input;