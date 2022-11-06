import React, { useState } from "react";
import logo from "../ui/logoproiect.png";
import { Cookies, useCookies } from "react-cookie";

import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  // const [nav, setNav] = useState([
  //     {label: "Home", slug: "/", icon: "icon-home"},
  //     {label: "Discover", slug: "/discover", icon: "icon-ul"},
  //     {label: "My Courses", slug: "/my-courses", icon: "icon-briefcase"},
  //     {label: "Logout", slug: "/SignIn", icon: "icon-exit"}
  // ])
  // const [currentPage, setCurrentPage] = useState("/");

  // var navigation = [];
  // for(let i = 0; i < nav.length; i++){
  //     navigation.push(
  //         <li key={"nav-" + i + "-" + nav[i].slug}>
  //             <NavLink to={nav[i].slug} className={"aic link noul flex c333"}>
  //                 <div className={"ico s20 " + nav[i].icon} />
  //                 <h2 className="lbl s20">{nav[i].label}</h2>
  //             </NavLink>
  //         </li>
  //     );
  // }

  // console.log(global.fire);

  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);

  function signOutUser() {
    console.log("signout");
    removeCookie("userId", { path: "/" });
    removeCookie("email", { path: "/" });
    removeCookie("role", { path: "/" });
  }

  return (
    <div className="sidebar rel">
      <a href="#" className="logo bl">
        <img src={logo} className="bl" />
      </a>

      <ul className="nav">
        <li>
          <h5>
            Hello, {cookies.firstName} {cookies.lastName}
          </h5>
        </li>

        <li key="nav-home">
          <NavLink to="/Home" className={"aic link noul flex c333"}>
            <div className="ico s20 icon-home" />
            <h2 className="lbl s20">Home</h2>
          </NavLink>
        </li>
        {/* <li key="nav-discover">
          <NavLink to="/Discover" className={"aic link noul flex c333"}>
            <div className="ico s20 icon-ul" />
            <h2 className="lbl s20">Discover</h2>
          </NavLink>
        </li> */}
        <li key="nav-my-courses">
          <NavLink to="/My-Courses" className={"aic link noul flex c333"}>
            <div className="ico s20 icon-briefcase" />
            <h2 className="lbl s20">My Courses</h2>
          </NavLink>
        </li>
        <li key="nav-personal-page">
          <NavLink to="/Personal-Page" className={"aic link noul flex c333"}>
            <div className="ico s20 icon-briefcase" />
            <h2 className="lbl s20">Personal Page</h2>
          </NavLink>
        </li>
        <li key="nav-signout">
          <Link
            onClick={signOutUser}
            to="/SignIn"
            className={"aic link noul flex c333"}
          >
            <div className="ico s20 icon-exit" />
            <h2 className="lbl s20">Sign Out</h2>
          </Link>
        </li>
      </ul>

      {/* <div className="updated-course flex aic">
                <div className="icon-lamp-bright cfff s24 ico" />
                <div className="lbl s15 fontb c333">
                    Updated Courses
                    <h2 className="author s13 c777">by Kamran Wajdani</h2>
                </div>
            </div> */}

      <div className="stats aic flex">
        {/* <div className="stats-box flex">
          <div className="ico ico-points s24 icon-shield" />
          <h2 className="val s15 c333 fontb">1800</h2>
          <h2 className="lbl s13 c777">points</h2>
        </div> */}

        {/* <div className="stats-box flex">
                    <div className="ico ico-battery s24 icon-battery-90" />
                    <h2 className="val s15 c333 fontb">45.3%</h2>
                    <h2 className="lbl s13 c777">complete</h2>
                </div> */}
      </div>

      {/* <div className="me flex aic">
                {1 ? <React.Fragment><div className="photo cfff s24">
                    <img src="http://placeimg.com/100/100/people" className="bl" />
                </div>
                <div className="lbl s15 fontb c333">
                    Kamran Wajdani   
                    <h2 className="uname s13 c777">@kamranwajdani</h2>                 
                </div>
                </React.Fragment>
                : 
                <NavLink to={"oauth"} className={"aic link noul flex c333"}>
                    <div className={"ico s24 rel cfff icon-portrait-male"} />
                    <h2 className="lbl s20 fontb">Sign out</h2>
                </NavLink>
                }
            </div> */}
    </div>
  );
}

export default Sidebar;
