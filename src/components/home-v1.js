import React from "react";
import Navbar from "./global-components/navbar";
// import Banner from "./section-components/ExportBanner";
import Banner from "./section-components/banner";
import Service from "./section-components/service";
import WhyChooseUs from "./section-components/why-choose-us";

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
