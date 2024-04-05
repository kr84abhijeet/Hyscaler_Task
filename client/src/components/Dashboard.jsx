import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../css/Dashboard.css'

const Dashboard = () => {
    const [message,setMessage] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/dashboard')
        .then(res => {
            if(res.data.valid){
                setMessage(res.data.message)
                

            }
            else{
                navigate('/')

            }
        })
        .catch(res => console.log(err))

    })
  return (
    <div>
    
    <div className="project-section">
      
            <div className="page-header">Dashboard {message}</div>
            <div className='hero-section-description'>
             <blockquote>
             WELCOME LEADER!
             <footer>- Hyscaler Team</footer>
             </blockquote>
        </div>


            <div className="project-container">
                <div className="project-card" id="project">
                    <div className="project-number project-number-right">01</div>
                    <div className="project-content project-content-left">

                        <div className="project-skills-container">
                            
                        </div>

                        <h2 className="project-heading">Holiday Package LIST</h2>

                        <p className="project-subHeading">Stuff your eyes with wonder, live as if you’d drop dead in ten seconds. See the world. It’s more fantastic than any dream made or paid for in factories.
                        </p>
                        <div className="btn-grp">
                            <button className="btn-pink btn-project"><a href="/packages">Read More</a></button>
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
                    <h2 className="project-heading">Salesform</h2>
                    <p className="project-sub-heading">
                    Do not focus on numbers. Focus on doing what you do best!!
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
          
                    <h2 className="project-heading">Admin Panel</h2>
                    <p className="project-sub-heading">
                    A great house is isn't run by a director but by a Admin!
                    </p>
                    <div className="btn-group">
                      <button className="btn-pink btn-project"><a href="/send-mail">Read More</a></button>
                     
                    </div>
                  </div>
                </div>
          
                
            </div>

        </div>
    </div>
    
    

  )
}

export default Dashboard
