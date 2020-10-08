import React from 'react';

import NavBar from '../../components/admin/NavBar';
import Footer from './../../components/admin/Footer/index';
import ProfileForm from '../../components/admin/profileForm';
import Header from './../../components/admin/Header/index';

const Profile = () => {
    return ( 
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <ProfileForm />
                </main>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default Profile;