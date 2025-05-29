import React from 'react';
import Navbar from '../../sharedpages/Navbar/Navbar';
import Footer from '../../sharedpages/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <header className='sticky z-50 top-0'>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;