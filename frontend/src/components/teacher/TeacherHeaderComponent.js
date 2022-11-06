import React from 'react'

const TeacherHeaderComponent = () => {
  return (
    <div>
        <header className='HeaderComponent-header'>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                    <a href="http://localhost:3000/homepageT" className="navbar-brand navbar-dark  bg-dark">
                        HOMEPAGE
                    </a>
                    <a href="http://localhost:3000/quizzes" className="navbar-brand navbar-dark bg-dark ">
                        edit quizzes
                    </a>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default TeacherHeaderComponent