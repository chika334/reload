import React from 'react';
import Navbar from './global-components/navbar';
import Bannerv2 from './section-components/banner-v2';
import Explore from './section-components/explore';
import FeaturedProperties from './section-components/featured-properties';
import Ads from './section-components/ads';
import PropertiesByCities from './section-components/properties-by-cities';
import RecentProperties from './section-components/recent-properties';
import FeaturedPorject from './section-components/featured-project';
import WhyChooseUs from './section-components/why-choose-us';
import OurPartner from './section-components/our-partner';
import Footer from './global-components/footer';

const Home_V1 = () => {
    return <div>
        <Navbar />
        <Bannerv2 />
        <Explore />
        <FeaturedProperties />
        <Ads />
        <PropertiesByCities />
        <RecentProperties />
        <FeaturedPorject />
        <WhyChooseUs />
        <OurPartner />
        <Footer />
    </div>
}

export default Home_V1

