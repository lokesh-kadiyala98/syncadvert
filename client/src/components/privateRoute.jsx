import React from 'react';
import { Route, useHistory } from 'react-router-dom'

import auth from './../services/authService'
import Modal from './Modal'
import Login from './admin/loginForm'


const PrivateRoute = ({ component: Component, ...rest}) => {
  const history = useHistory()

    const navigateToHome = () => {
      history.goBack()
    }

    return (
      <Route {...rest} render={(props) => (
        auth.isAuthenticated() ?
          <Component {...props} /> :
          <React.Fragment>
            <Component {...props} />
            <Modal modal={true} modalClassName="full-size" overlayClassName="Overlay" onCancel={navigateToHome}>
              <Login onSuccess={rest.location.pathname} onCancel={navigateToHome} />
            </Modal>
          </React.Fragment>
        )} 
      />
    )
}
  
export default PrivateRoute