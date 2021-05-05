import React from 'react';
import Navbar from './global-components/navbar';
import Bannerv4 from './section-components/banner-v4';
import AppermentSlider from './section-components/appertment-slider';
import About from './section-components/aboutv2';
import RoomSpacing from './section-components/room-spacing';
import CalltoAction from './section-components/calltoaction';
import Client from './section-components/client';
import OurPartner from './section-components/our-partner';
import Footer from './global-components/footer-v2';

const Home_V1 = () => {
    return <div>
        <Navbar />
        <Bannerv4 />
        <AppermentSlider />
        <About />
        <RoomSpacing />
        <CalltoAction />
        <Client PaddingTop="pd-top-60" PaddingBottom="0"/>
        <OurPartner />
        <Footer />
    </div>
}

export default Home_V1

