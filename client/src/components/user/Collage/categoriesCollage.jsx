import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import './style.css'
import { s3BucketName } from './../../../config.json'

const CategoriesCollage = ({categories}) => {
    const history = useHistory()
    const [clickedCategory, setClickedCategory] = useState(null)

    const onCategoryClick = (id) => {
        setClickedCategory(id)
        
        if (clickedCategory === id)
            history.push(`/gallery/${id}`)
    }

    return ( 
        <section className="showcase set-padding">
            <h2 className="text-center underlined-heading">Our Finest Collection</h2>

            <div className="card-columns categories collage">

                {categories && Object.keys(categories).map(id =>  
                    {return categories[id].pinImg && 
                        <div onClick={() => onCategoryClick(id)} className="card" key={id}>
                            <div className="text-container">
                                <div className="text" 
                                    style={{opacity: (clickedCategory === id ? '1': '0')}}
                                >
                                    See More from {categories[id].name}
                                </div>
                            </div>
                            <div className="overlay" 
                                style={{opacity: (clickedCategory === id ? '1': '0')}}
                            ></div>
                            <img className="card-img-top img-fluid" src={s3BucketName + categories[id].pinImg.path} alt="gallery" />
                        </div>
                    }
                )}

                <div onClick={() => history.push('/gallery')} className="card">
                        <div className="text-container">
                            <div className="text" style={{opacity: '0'}}>
                                All Images
                            </div>
                        </div>
                    <div className="overlay" style={{opacity: '0'}}></div>
                    <img className="card-img-top img-fluid" src={s3BucketName + "gallery/pexels-ginu-plathottam-165939.jpg"} alt="gallery" />
                </div>
            </div>

        </section>
    );
}
 
export default CategoriesCollage;