import React, {useEffect, useState} from "react";
import Sidebar from './Sidebar';
import "../css/uifont.css";
import "../css/props.css";
import "../css/App.css";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import "../css/grid-home.css";
import Course1 from "../ui/course-1.png";
import Course2 from "../ui/course-2.jpg";
import Course3 from "../ui/course-3.jpg";
import Course4 from "../ui/course-4.jpg";
import axios from "axios";
import { Cookies, useCookies } from 'react-cookie';

import {
    Navigate,
    NavLink,    
} from "react-router-dom";

function Homepage() {

    const [cookies, setCookie, removeCookie] = useCookies(['userId', 'email', 'role']);

    useEffect(()=>{
        document.title = "DB Learning";
    })

    const [popularCourse, setPopularCourse] = useState([
        {
            ID: 1,
            title: "Software Tester",
            tutor: {
                ID: 1,
                name: "Emi Berbece",
                username: "emiberbece",
                dp: "https://4mayo.ro/wp-content/uploads/2020/11/Emi.png",
            },
            duration: "6 weeks",            
            poster: Course1
        },
        {
            ID: 2,
            title: "RPA Developer",
            tutor: {
                ID: 2,
                name: "Ninett Panfir",
                username: "ninettpanfir",
                dp: "https://4mayo.ro/wp-content/uploads/2022/06/Ninett-200x200.png",
            },
            duration: "12 weeks",            
            poster: Course2
        },
        {
            ID: 3,
            title: "Frontend Developer",
            tutor: {
                ID: 3,
                name: "Alexandru Tapirdea",
                username: "alexandrutapirdea",
                dp: "https://4mayo.ro/wp-content/uploads/2022/08/Alex-200x200.png",
            },
            duration: "18 weeks",            
            poster: Course3
        },
        {
            ID: 4,
            title: "OOP",
            tutor: {
                ID: 2,
                name: "Razvan Mihai",
                username: "razvanmihai",
                dp: "https://4mayo.ro/wp-content/uploads/2022/08/Razvan.png",
            },
            duration: "9 weeks",            
            poster: Course4
        }
        
    ]);

    const [topTutors, setTopTutors] = useState([
        {
                ID: 1,
                name: "Lana Marandina",
                username: "lanamara",
                dp: "http://placeimg.com/100/100/people?tutors-" + 1,
        },
        {
            ID: 2,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 2,
        },        
        {
            ID: 3,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 3,
        },
        {
            ID: 4,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 4,
        },
        {
            ID: 5,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 5,
        },        
        {
            ID: 6,
            name: "Lana Marandina",
            username: "lanamara",
            dp: "http://placeimg.com/100/100/people?tutors-" + 6,
        }
    ]);

    //Live Tutors List
    var tutorList = [];
    for(let i = 0; i < 8; i++){
        tutorList.push(
            <button className="tutor rel" key={"tutor-live-" + i}>
                <img src={"http://placeimg.com/100/100/people?" + i}  className="bl" />
            </button>
        );
    }

    var courseList = [];
    for(let i = 0; i < popularCourse.length; i++){
        courseList.push(
            <NavLink to={"/course/" + popularCourse[i].ID} className="course rel" key={"popular-course-" + i}>
                <div className="block"  style={{
                    background: "#e2e2e2 url(" + popularCourse[i].poster +") "
                }}>

                    <div className="user abs aic flex">
                        <div className="pic">
                            <img src={popularCourse[i].tutor.dp} className="bl" />
                        </div>
                        <div className="meta rel">
                            <h2 className="s15 name fontb cfff">{popularCourse[i].tutor.name}</h2>
                            <h2 className="s13 uname fontn cfff">@{popularCourse[i].tutor.username}</h2>
                        </div>
                    </div>

                    <div className="dura abs">
                        <h2 className="s13 name fontb cfff">{popularCourse[i].duration}</h2>
                    </div>

                    <div className="course-title abs">
                        <h2 className="s15 name fontb cfff">{popularCourse[i].title}</h2>
                    </div>

                </div>
            </NavLink>
        );
    }

    var topTutorsList = [];
    for(let i = 0; i < topTutors.length; i++){
        topTutorsList.push(
            <a href="#" className="user-block rel noul" key={"top-tutors-" + i}>
                <div className="user aic flex">
                    <div className="pic">
                        <img src={topTutors[i].dp} className="bl" />
                    </div>
                    <div className="meta rel">
                        <h2 className="s15 name fontb c333">{topTutors[i].name}</h2>
                        <h2 className="s13 uname fontn c333">@{topTutors[i].username}</h2>
                    </div>
                </div>                
            </a>
        );
    }

    if(cookies.userId === undefined || cookies.email === undefined || cookies.role === undefined){
        return(
            <Navigate to="/SignIn" />
        );
    }
    

    return(
        <div className="main-container">
            <div className="search-bar">

            </div>
            <div className="side-bar">
                <Sidebar />
            </div>

            <div className="content-container">
                <div className="section section-b rel">
                    <div className="courses rel flex">
                        {courseList}
                    </div>
                </div>
            </div>

            <div className="footer">

            </div>
            
        </div>
    );
}

export default Homepage;
