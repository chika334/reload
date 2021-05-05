import React, { useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import blogdata from "./data/blogdata.json";
import Singleblogdata from "./data/single-blogdata.json";
import HomeV1 from "./components/home-v1";
import HomeV2 from "./components/home-v2";
import HomeV3 from "./components/home-v3";
import HomeV4 from "./components/home-v4";
import Property from "./components/property";
import AvilableProperty from "./components/availavbe-property";
import PropertiesByCity from "./components/properties-by-city";
import RecentProperties from "./components/recent-properties";
import PropertyDetails from "./components/property-details";
import About from "./components/about";
import Advisor from "./components/advisor";
import Pricing from "./components/pricing";
import UserList from "./components/user-list";
import Registraion from "./components/registration";
import Error from "./components/error";
import Faq from "./components/faq";
import News from "./components/news";
import NewsDetails from "./components/news-details";
import Contact from "./components/contact";
import SearchMap from "./components/search-map";
import SearchGrid from "./components/search-grid";
import SearchList from "./components/search-list";
import AddNew from "./components/add-property";
import SuccessMessage from './components/SuccessMessage'

import { showLoader, hideLoader } from "./_action/loading";
import { useSelector, connect } from "react-redux";
import Loading from "./components/global-components/loading";

function Routes(props) {
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    props.showLoader();
    setTimeout(() => {
      props.hideLoader();
    }, 2000);
  }, []);

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : (
        <Suspense>
          <Switch>
            <Redirect from="/react/realdeal#/" to="/" />
          </Switch>
          <Switch>
            <Route exact path="/" component={HomeV1} />
            <Route exact path="/about" component={About} />
            <Route exact path="/registration" component={Registraion} />
            <Route exact path="/error" component={Error} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/products" component={Property} />
            <Route exact path="/product-details" component={PropertyDetails} />
            <Route
              exact
              path="/availavbe-property"
              component={AvilableProperty}
            />
            <Route
              exact
              path="/properties-by-city"
              component={PropertiesByCity}
            />
            <Route
              exact
              path="/recent-properties"
              component={RecentProperties}
            />
            <Route exact path="/advisor" component={Advisor} />
            <Route exact path="/pricing" component={Pricing} />
            <Route exact path="/user-list" component={UserList} />
            <Route exact path="/news" component={News} />
            <Route exact path="/news-details" component={NewsDetails} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/search-map" component={SearchMap} />
            <Route exact path="/search-grid" component={SearchGrid} />
            <Route exact path="/search-list" component={SearchList} />
            <Route exact path="/add-property" component={AddNew} />
            <Route exact path="/successMessage" component={SuccessMessage} />
          </Switch>
        </Suspense>
      )}
    </div>
  );
}

export default connect(null, { showLoader, hideLoader })(Routes);
// export default Root;

// ReactDOM.render(<Root />, document.getElementById("realdeal"));
