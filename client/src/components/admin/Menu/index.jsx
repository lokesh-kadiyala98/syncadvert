import React from 'react';

import './style.css'
import { toast } from 'react-toastify';

const Menu = ({ categories, currentCategory, onImageEdit, onAddCategory, onDelete, isPinImg }) => {
    
    const handleEdit = (id) => {
        if (isPinImg)
            return toast.warning('PIN IMAGE: Category cant be changed.')
        
        onImageEdit({ category: id })
    }

    const handleDelete = () => {
        if (isPinImg)
            return toast.error('PIN IMAGE: Image cant be deleted.')
            
        onDelete()
    }

    return ( 
        <ul className="menu" style={{display: 'inline-block'}}>
            <li className="menu-item">Categories
                <ul className="sub-menu">
                    {categories && Object.keys(categories).map(id => 
                        <li 
                            key={id} 
                            onClick={() => handleEdit(id)}
                            className={id === currentCategory ? 'menu-item active' : 'menu-item'}
                        >
                            {categories[id].name}
                        </li>)
                    }
                    <li onClick={onAddCategory} className='menu-item line-top hover-bg-success'>Add Category</li>
                </ul>
            </li>
            <li className="menu-item hover-bg-danger line-top" onClick={handleDelete}>
                Delete
            </li>
        </ul>
    );
}
 
export default Menu;