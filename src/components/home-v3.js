import React from 'react';
import Navbar from './global-components/navbar';
import Bannerv3 from './section-components/banner-v3';
import FeaturedProperties from './section-components/featured-properties';
import Dream from './section-components/dream';
import PopularProperty from './section-components/popular-property';
import TeamV2 from './section-components/team-v2';
import Client from './section-components/client';
import OurPartner from './section-components/our-partner';
import Footer from './global-components/footer-v2';

const Home_V1 = () => {
    return <div>
        <Navbar />
        <Bannerv3 />
        <FeaturedProperties Customclass="pd-top-90" />
        <Dream />
        <PopularProperty />
        <TeamV2 />
        <Client PaddingTop="pd-top-60" PaddingBottom="0"/>
        <OurPartner />
        <Footer />
    </div>
}

export default Home_V1

