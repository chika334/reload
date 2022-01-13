import React, { useEffect, useState } from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import SearchListSection from "./section-components/search-list";
import Footer from "./global-components/footer";
import { withRouter } from "react-router-dom";
import { searchProducts } from "../data/products";

const SearchList = (props) => {
  const [searchproductData, setSearchProductData] = useState();
  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const productKey = params.get("product");
    setSearchProductData(searchProducts[productKey]);
  }, [props.location]);

  return (
    <div>
      {/* <Navbar /> */}
      {!searchproductData ? null : (
        <PageHeader
          headertitle={`${searchproductData.key} Products`}
          subheader={searchproductData.key}
        />
      )}
      <SearchListSection />
      {/* <Footer /> */}
    </div>
  );
};

export default withRouter(SearchList);
