import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../../components/user/NavBar';
import Header from '../../components/user/Header';
import MainTeam from './../../components/user/Team/mainTeam';
import CategoriesCollage from './../../components/user/Collage/categoriesCollage';
import Testimonials from '../../components/user/Testimonial';
import FixedCTA from '../../components/user/FixedCTA';
import Footer from '../../components/user/Footer';

import { fetchCategories, getCategories } from './../../store/categories';

const Home = () => {
    const dispatch = useDispatch()

    const categories = useSelector(getCategories)
    
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <React.Fragment>
            <NavBar />
            <Header />
            <MainTeam />
            <CategoriesCollage
                categories={categories} 
            />
            <Testimonials />
            <FixedCTA />
            <Footer />
        </React.Fragment>
    );
}

export default Home;