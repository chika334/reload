import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

class Featured extends Component {


    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'
        let data = sectiondata.featuredproperties
        let Customclass = this.props.Customclass ? this.props.Customclass : 'pd-top-60'


    return <div className={"featured-area  "+Customclass}>
          <div className="container">
            <div className="section-title text-center">
              <h2 className="title">{ data.title }</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="single-leading-feature">
                  <div className="slf-overlay" />
                  <div className="thumb">
                    <img src={publicUrl+data.firstitem.image} alt={ imagealt } />
                  </div>
                  <div className="details">
                    <h4 className="title readeal-top"><Link to={ data.firstitem.url  }>{ data.firstitem.title }</Link></h4>
                    <h5 className="price">{ data.firstitem.price }</h5>
                    <span>{ data.firstitem.content }</span>
                  </div>
                </div>
              </div>
              { data.items.map( ( item, i )=>
                  <div key={ i } className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="single-feature">
                      <div className="thumb">
                        <img src={ publicUrl+item.image } alt={ imagealt } />
                      </div>
                      <div className="details">
                        <a href="#" className="feature-logo">
                          <img src={publicUrl+item.icon} alt={ imagealt } />
                        </a>
                        <p className="author"><i className="fa fa-user" /> { item.authorname }</p>
                        <h6 className="title readeal-top"><Link to={ item.url }>{ item.title }</Link></h6>
                        <h6 className="price">{ item.newerprice }</h6><del>{ item.olderprice }</del>
                        <ul className="info-list">

                        { item.features.map( ( features, i )=>
                          <li key={ i } ><i className={ features.icon } /> { features.title }</li>
                         ) }  
                          <li><img src={publicUrl+"/assets/img/icons/7.png"} alt="img" /> { item.area }</li>
                        </ul>
                        <ul className="contact-list">
                          <li><a className="phone" href="#"><i className="fa fa-phone" /></a></li>
                          <li><a className="message" href="#"><img src={ publicUrl+"/assets/img/icons/8.png" } alt="img" /></a></li>
                          <li className="readeal-top"><Link className="btn btn-yellow" to={item.url}>View Details</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
               ) }
              
            </div>
          </div>
        </div>



        }
}

export default Featured