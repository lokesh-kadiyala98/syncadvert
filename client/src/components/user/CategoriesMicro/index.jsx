import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories, getCategories } from './../../../store/categories';
import {s3BucketName} from './../../../config.json'
import './style.css'
import { Link } from 'react-router-dom';

const CategoriesMicro = () => {
    const dispatch = useDispatch()
    const categories = useSelector(getCategories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return ( 
        <section className="categories-micro container set-padding">
                <h3 className="text-center mb-5">Still not sure you could vouch on us? Look at our previous work.</h3>
                <div className="row">
                    {categories && Object.keys(categories).map(id => 
                        <Link to={"/gallery/"+id} key={id}>
                            <img src={s3BucketName + categories[id].pinImg.path} alt={categories[id].name} />
                            <p className="text-center">{categories[id].name}</p>
                        </Link>    
                    )}
                </div>
        </section>
    );
}
 
export default CategoriesMicro;