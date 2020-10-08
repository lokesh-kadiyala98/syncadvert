import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Waypoint} from 'react-waypoint'

import CategoryForm from '../categoryForm';
import Menu from '../Menu';
import Modal from '../../Modal';
import Loader from './../../Loader';

import { deleteImage, editImage, fetchImages, getImages } from '../../../store/gallery';
import { s3BucketName } from '../../../config.json'
import './style.css'
import { editCategory, fetchCategories, getCategories } from './../../../store/categories';

const Collage = () => {
    const dispatch = useDispatch()
    
    const [categoriesForm, showCategoriesForm] = useState(false)
    const [menu, showMenu] = useState(null)

    const categories = useSelector(getCategories)
    const gallery = useSelector(getImages)
   
    const {list: images, loading, pagination} = gallery

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const handleCategoryEdit = (categoryId, imageId) => {
        const data = {pinImg: imageId}
        if (imageId === null && !window.confirm('Do you really want to UNPIN the image?'))
            return
    
        dispatch(editCategory(categoryId, data))
    }

    const handleImageEdit = (data) => {
        const id = menu
        dispatch(editImage(id, data))
    }

    const handleImageDelete = (path) => {
        if (window.confirm('Do you really want to DELETE the image?')) {
            const payload = {path}
            dispatch(deleteImage(payload))
        }
    }

    const handleMenuOpen = (e, _id) => {
        const {nodeName} = e.target
        
        if (nodeName === 'IMG' && menu !== _id)
            showMenu(_id)
        else if (nodeName !== 'LI' && nodeName !== 'SPAN' && nodeName !== 'I')
            showMenu(menu ? null : _id)
    }

    const handleOnEnter = () => {
        dispatch(fetchImages())
    }

    return ( 
        <React.Fragment>
            <div className="card-columns">
                {Object.keys(categories).length > 0 && 
                    images.length > 0 && 
                    images.map(image =>                     
                    <div key={image._id} onClick={(e) => handleMenuOpen(e, image._id)} className="card" style={{overflow: 'visible'}}>
                        
                        <div className="img-header">    
                            <i style={{pointerEvents: 'none'}} className="fa fa-angle-down"></i>
                            {menu === image._id ? 
                                <Menu
                                    categories={categories}
                                    currentCategory={image.category}
                                    onImageEdit={handleImageEdit}
                                    isPinImg={categories[image.category].pinImg && categories[image.category].pinImg._id === image._id}
                                    onAddCategory={() => showCategoriesForm(true)}
                                    onDelete={() => handleImageDelete(image.path)} 
                                /> :
                                null
                            }

                            {categories[image.category].pinImg && 
                                categories[image.category].pinImg._id === image._id ? 
                                    <span onClick={() => handleCategoryEdit(image.category, null)} className="pin bg-secondary pinned">
                                        <span className="pin-text bg-secondary">{categories[image.category].name}</span>
                                        <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                                    </span> :
                                    <span onClick={() => handleCategoryEdit(image.category, image._id)} className="pin bg-secondary">
                                        <span className="pin-text bg-secondary">{categories[image.category].name}</span>
                                        <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                                    </span>
                            }
                        </div> 
                        <img className="card-img-top fluid-img" src={s3BucketName + image.path} alt="gallery" />
                    </div>
                )}
            </div>
            
            {!pagination.allCaughtUp ?                    
                <Waypoint
                    onEnter={handleOnEnter} 
                /> :
                null
            } 

            {loading && <Loader />}

            <Modal modal={categoriesForm} 
                overlayClassName="Overlay" 
            >
                <CategoryForm
                    onCancel={() => showCategoriesForm(false)}
                    categories={categories}
                />
            </Modal>
        </React.Fragment>
    );
}
 
export default Collage;