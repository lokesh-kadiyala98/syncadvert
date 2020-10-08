import React from 'react';
import { useDispatch } from 'react-redux';

import NavBar from '../../components/admin/NavBar';
import Header from './../../components/admin/Header/index';
import UploadImage from './../../components/Form/uploadImage';
import Collage from './../../components/admin/Collage';
import Footer from '../../components/admin/Footer';

import { addImage, deleteImage } from './../../store/gallery';

const Gallery = () => {
    const dispatch = useDispatch()

    const handleImageUploadSuccess = (imgPath) => {
        const payload = {path: imgPath}
        dispatch(addImage(payload))
    }

    const handleImageUploadRevert = (imgPath) => {
        const payload = {path: imgPath}
        dispatch(deleteImage(payload))
    }

    return (
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <UploadImage
                        allowMultiple={true}
                        labelIdle='Drop Image or <span class="filepond--label-action">Browse</span> to Upload'
                        nameSpace='gallery'
                        onSuccess={handleImageUploadSuccess}
                        onRevert={handleImageUploadRevert}
                    />

                    <Collage />
                </main>
            </div>
            <Footer />
        </React.Fragment> 
    );
}
 
export default Gallery;