import React from 'react';

import NavBar from '../../components/admin/NavBar';
import Dashboards from './../../components/admin/Dashboards';
import Footer from '../../components/admin/Footer';
import Header from './../../components/admin/Header';

const Home = () => {
    return ( 
        <React.Fragment>
            <div className="admin-view">
                <NavBar />
                <main>
                    <Header />
                    <Dashboards />
                </main>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default Home;