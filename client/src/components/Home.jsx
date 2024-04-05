import React from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    
      
      <div className="project-section">
      
            <div className="page-header">Dashboard</div>
            <div className='hero-section-description'>
             <blockquote>
             It's not about having the right opportunities.
             It's about handling the opportunities right.
             <footer>- Hyscaler Team</footer>
             </blockquote>
        </div>


            <div className="project-container">
                <div className="project-card" id="project">
                    <div className="project-number project-number-right">01</div>
                    <div className="project-content project-content-left">

                        <div className="project-skills-container">
                            
                        </div>

                        <h2 className="project-heading">Holiday Package</h2>

                        <p className="project-subHeading">Stuff your eyes with wonder, live as if you’d drop dead in ten seconds. See the world. It’s more fantastic than any dream made or paid for in factories.
                        </p>
                        <div className="btn-grp">
                            <button className="btn-pink btn-project"><a href="/holiday-package">Read More</a></button>
                            <a href="">
                            <i title="GitHubLink" className="fa-brands fa-github icon"></i>
                            </a>
                            <a href="">
                            <i title="Live Link" className="fa-solid fa-link icon"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="project-card" id="project2">
                  <div className="project-number project-number-left">02</div>
                  <div className="project-content project-content-right">
                    <div className="project-skill-container">
                      
                    </div>
                    <h2 className="project-heading">Sales</h2>
                    <p className="project-sub-heading">
                    Become the person who would attract the results you seek.
                    </p>
                    <div className="btn-group">
                      <button className="btn-pink btn-project"><a href="/sales">Read More</a></button>
                      
                    </div>
                  </div>
                </div>
          
                <div className="project-card" id="project3">
                  <div className="project-number project-number-right">03</div>
                  <div className="project-content project-content-left">
                    <div className="project-skill-container">
                      
                    </div>
          
                    <h2 className="project-heading">Bookings</h2>
                    <p className="project-sub-heading">
                    After a while, just staying alive becomes a full-time job. No wonder we need a vacation
                    </p>
                    <div className="btn-group">
                      <button className="btn-pink btn-project">Read More</button>
                     
                    </div>
                  </div>
                </div>
          
                
            </div>

        </div>
    
  )
}

export default Home
