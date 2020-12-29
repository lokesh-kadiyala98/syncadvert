import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore';

import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/scrollToTop';
import Loader from './components/Loader';

const PrivateRoute = React.lazy(() => import('./components/privateRoute'));
const Home = React.lazy(() => import('./views/user/home'));
const Gallery = React.lazy(() => import('./views/user/gallery'));
const Blog = React.lazy(() => import('./views/user/blog'));
const About = React.lazy(() => import('./views/user/about'));
const Careers = React.lazy(() => import('./views/user/careers'));
const NotFound = React.lazy(() => import('./components/user/NotFound'));
const AdminHome = React.lazy(() => import('./views/admin/home'));
const AdminGallery = React.lazy(() => import('./views/admin/gallery'));
const AdminCTA = React.lazy(() => import('./views/admin/cta'));
const AdminTeam = React.lazy(() => import('./views/admin/team'));
const AdminTestimonial = React.lazy(() => import('./views/admin/testimonial'));
const AdminBlog = React.lazy(() => import('./views/admin/blog'));
const AdminCareers = React.lazy(() => import('./views/admin/careers'));
const AdminProfile = React.lazy(() => import('./views/admin/profile'));

const store = configureStore()

function App () {
  return ( 
    <Provider store={store}>
      <ToastContainer />
      <ScrollToTop />
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute path="/adminGallery" component={AdminGallery} />
          <PrivateRoute path="/adminCTA" component={AdminCTA} />
          <PrivateRoute path="/adminTeam" component={AdminTeam} />
          <PrivateRoute path="/adminTestimonials" component={AdminTestimonial} />
          <PrivateRoute path="/adminBlog/:blogId" component={AdminBlog} />
          <PrivateRoute path="/adminBlog" component={AdminBlog} />
          <PrivateRoute path="/adminProfile" component={AdminProfile} />
          <PrivateRoute path="/adminCareers" component={AdminCareers} />
          <PrivateRoute exact path="/admin" component={AdminHome} />
          <Route path="/gallery/:category" component={Gallery} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/blog/:blogId" component={Blog} />
          <Route path="/blogs" component={Blog} />
          <Route path="/about" component={About} />
          <Route path="/careers" component={Careers} />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to="/not-found" />  
        </Switch>
      </React.Suspense>
    </Provider>
  )
}

export default App;
