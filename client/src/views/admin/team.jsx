import React from 'react';

import NavBar from '../../components/admin/NavBar'
import Header from './../../components/admin/Header'
import Team from './../../components/admin/Team'
import Footer from './../../components/admin/Footer'

const TeamView = () => {
    return ( 
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <Team />
                </main>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default TeamView;