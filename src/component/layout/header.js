import React, {useEffect, useState} from "react";
import logo from '../../assets/images/logo.png';
import loader from '../../assets/images/loader.gif';
import { Link } from 'react-router-dom';
import history from './../../history';
import {useLocation} from "react-router-dom";

export function Header() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#"><img height="40" src={logo}></img></a>
          </div>
          <div id="navbar" >
            <ul className="nav navbar-nav">
              <li className={ path === "/" || path === "" ? "active" :""} onClick={()=> { history.push("/")}}>
                <Link to="/">
                  Pokemon List
                </Link>
              </li>
              <li className={path === "/mypokemon" ? "active" :""}>
                <Link to="/mypokemon">
                  My Pokemon
                </Link>
              </li>
            </ul>
          </div>
          {/* <img id="loader" src={loader}   style={{display:(this.props.isLoaderShow ? 'block':'none')}} /> */}
      </div>
    </nav>
  );
}