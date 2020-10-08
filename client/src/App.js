import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'

import PrivateRoute from './components/privateRoute'
import Home from './views/user/home';
import Gallery from './views/user/gallery';
import Blog from './views/user/blog';
import About from './views/user/about';
import Careers from './views/user/careers';
import NotFound from './components/user/NotFound';
import AdminHome from './views/admin/home'
import AdminGallery from './views/admin/gallery'
import AdminCTA from './views/admin/cta'
import AdminTeam from './views/admin/team'
import AdminTestimonial from './views/admin/testimonial';
import AdminBlog from './views/admin/blog'
import AdminProfile from './views/admin/profile'

import configureStore from './store/configureStore';

import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/scrollToTop';

const store = configureStore()

function App () {
  return ( 
    <Provider store={store}>
      <ToastContainer />
      <ScrollToTop />
        <Switch>
          <PrivateRoute path="/adminGallery" component={AdminGallery} />
          <PrivateRoute path="/adminCTA" component={AdminCTA} />
          <PrivateRoute path="/adminTeam" component={AdminTeam} />
          <PrivateRoute path="/adminTestimonials" component={AdminTestimonial} />
          <PrivateRoute path="/adminBlog/:blogId" component={AdminBlog} />
          <PrivateRoute path="/adminBlog" component={AdminBlog} />
          <PrivateRoute path="/adminProfile" component={AdminProfile} />
          <PrivateRoute exact path="/admin" component={AdminHome} />
          <Route path="/gallery/:category" component={Gallery} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/blog/:blogId" component={Blog} />
          <Route path="/blog" component={Blog} />
          <Route path="/about" component={About} />
          <Route path="/careers" component={Careers} />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to="/not-found" />  
        </Switch>
    </Provider>
  )
}

export default App;
