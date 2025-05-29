import React from 'react';
import Banner from './Banner/Banner';
import PackageGrid from '../../components/PackageGrid/PackageGrid';
import GridManager from '../../components/GridManager/GridManager';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <GridManager></GridManager>
        </div>
    );
};

export default Home;