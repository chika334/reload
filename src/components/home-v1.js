import React from "react";
import Navbar from "./global-components/navbar";
// import Banner from "./section-components/ExportBanner";
import Banner from "./section-components/banner";
import Service from "./section-components/service";
import Explore from "./section-components/explore";
import FeaturedProperties from "./section-components/featured-properties";
import Ads from "./section-components/ads";
import PropertiesByCities from "./section-components/properties-by-cities";
import RecentProperties from "./section-components/recent-properties";
import FeaturedPorject from "./section-components/featured-project";
import WhyChooseUs from "./section-components/why-choose-us";
import OurPartner from "./section-components/our-partner";
import Footer from "./global-components/footer";
import GoogleAd from "../Layout";

const Home_V1 = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Banner />
      <Service />
      {/* <RecentProperties /> */}
      {/* <FeaturedPorject /> */}
      <WhyChooseUs />
      {/* <GoogleAd slot="5153321367" timeout={1000} classNames="page-bottom" /> */}
      {/* <OurPartner /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home_V1;
