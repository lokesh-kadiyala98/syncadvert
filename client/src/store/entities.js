import { combineReducers } from 'redux';

import categoriesReducer from './categories'
import galleryReducer from './gallery'
import CTAReducer from './cta'
import teamReducer from './team'
import testimonialsReducer from './testimonials'

export default combineReducers({
    categories: categoriesReducer,
    gallery: galleryReducer,
    CTA: CTAReducer,
    team: teamReducer,
    testimonials: testimonialsReducer
})