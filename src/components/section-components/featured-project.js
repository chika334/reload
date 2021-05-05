import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

class FeaturedProject extends Component {


    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'
        let data = sectiondata.featuredproject


    return <div className="featured-projects pd-top-60 pd-bottom-70">
        <div className="container">
          <div className="section-title">
            <h2 className="title">{ data.title }</h2>
          </div>
          <div className="featured-slider slider-control-top">
          { data.items.map( ( item, i )=>
                <div key={ i } className="item">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="single-leading-feature">
                      <div className="slf-overlay" />
                      <div className="thumb">
                        <img src={ publicUrl+item.imageFirstItem } alt={ imagealt }/>
                      </div>
                      <div className="details">
                        <h4 className="title readeal-top"><Link to="/property-details">{ item.titleFirstItem  }</Link></h4>
                        <h5 className="price">{ item.priceFirstItem }</h5>
                        <span>{ item.contentFirstItem }</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="single-feature">
                      <div className="thumb">
                        <img src={ publicUrl+item.imageThirdItem } alt={ imagealt } />
                      </div>
                      <div className="details">
                        <a href="#" className="feature-logo">
                          <img src={ publicUrl+item.iconSecondItem } alt={ imagealt } />
                        </a>
                        <p className="author"><i className="fa fa-user" /> { item.authornameSecondItem }</p>
                        <h6 className="title readeal-top"><Link to="/property-details">{ item.titleSecondItem }</Link></h6>
                        <h6 className="price">{ item.newerpriceSecondItem }</h6><del>{ item.olderpriceSecondItem }</del>
                        <ul className="info-list">
                          { item.featuresSecondItem.map( ( features, i )=>
                             <li key={ i } ><i className={ features.icon } /> { features.title }</li>
                           ) }  
                          <li><img src={publicUrl+"/assets/img/icons/7.png"} alt="img" /> { item.areaSecondItem }</li>
                        </ul>
                        <ul className="contact-list">
                          <li><a className="phone" href="#"><i className="fa fa-phone" /></a></li>
                          <li><a className="message" href="#"><img src={publicUrl+"/assets/img/icons/8.png"} alt="img" /></a></li>
                          <li><a className="btn btn-yellow" href={ item.urlSecondItem }>View Details</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="single-feature">
                      <div className="thumb">
                         <img src={ publicUrl+item.imageThirdItem } alt={ imagealt } />
                      </div>
                      <div className="details">
                        <a href="#" className="feature-logo">
                         <img src={ publicUrl+item.iconThirdItem } alt={ imagealt } />
                        </a>
                        <p className="author"><i className="fa fa-user" /> { item.authornameThirdItem }</p>
                       <h6 className="title readeal-top"><Link to="/property-details">{ item.titleThirdItem }</Link></h6>
                        <h6 className="price">{ item.newerpriceThirdItem }</h6><del>{ item.olderpriceThirdItem }</del>
                        <ul className="info-list">
                           { item.featuresThirdItem.map( ( features, i )=>
                             <li key={ i } ><i className={ features.icon } /> { features.title }</li>
                           ) }
                          <li><img src={publicUrl+"/assets/img/icons/7.png"} alt="img" /> { item.areaThirdItem }</li>
                        </ul>
                        <ul className="contact-list">
                          <li><a className="phone" href="#"><i className="fa fa-phone" /></a></li>
                          <li><a className="message" href="#"><img src={publicUrl+"/assets/img/icons/8.png"} alt="img" /></a></li>
                          <li className="readeal-top"><Link className="btn btn-yellow" to="/property-details">View Details</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
           ) }
            
          </div>
        </div>
      </div>

        }
}

export default FeaturedProject