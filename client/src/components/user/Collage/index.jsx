import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Waypoint} from 'react-waypoint'

import Loader from './../../Loader/index';

import { fetchImages, getImages } from './../../../store/gallery';
import { fetchCategories, getCategories } from './../../../store/categories';
import { s3BucketName } from './../../../config.json'
import './../../admin/Collage/style.css'

const Collage = ({ category }) => {
    const dispatch = useDispatch()
    
    const gallery = useSelector(getImages)
    const categories = useSelector(getCategories)

    const name = categories[category] ? categories[category].name : 'Our Fine Collection'
    const {list: images, loading, pagination} = gallery

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchImages(category))
    }, [dispatch, category])
    
    const handleOnEnter = () => {
        dispatch(fetchImages(category))
    }

    return ( 
        <section className="showcase set-padding" id="collage">
            <h2 className="text-center underlined-heading">{name}</h2>

            <div className="card-columns collage">
                {images && images.map(image =>                     
                    <div key={image._id} className="card">
                        <img className="card-img-top img-fluid" src={s3BucketName + image.path} alt="gallery" />
                    </div>
                )}
            </div>

            {/* <div className="grid collage">
                {images && images.map(image =>                     
                    <div key={image._id} className={image.gridView}>
                        <img className="img" src={s3BucketName + image.path} alt="gallery" />
                    </div>
                )}
            </div> */}

            {!pagination.allCaughtUp ?                    
                <Waypoint
                onEnter={handleOnEnter} 
                /> :
                <Loader allCaughtUp={pagination.allCaughtUp} />
            }

            {loading && <Loader />}

        </section>
    );
}
 
export default Collage;