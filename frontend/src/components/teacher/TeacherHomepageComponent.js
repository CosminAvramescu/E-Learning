import React from 'react'

const TeacherHomepageComponent = () =>{ 
        const myStyle={
            backgroundImage: 
            "url('https://i.ytimg.com/vi/YPTRTgSNoRc/maxresdefault.jpg')",
            height:'100vh',
            marginTop:'-70px',
            fontSize:'50px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };
        return (
          <div style={myStyle}>
            <h1> e-learning homepage </h1>
          </div>
        );
      
};

export default TeacherHomepageComponent;
