import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { fetchTeamMembers, getTeam } from './../../../store/team';
import {s3BucketName} from './../../../config.json'
import './mainTeam.css'

const MainTeam = () => {
    const [active, setActive] = useState(1)

    const dispatch = useDispatch()
    const {list: team} = useSelector(getTeam)
    
    useEffect(() => {
        dispatch(fetchTeamMembers())
        if (team.length > 0)
            setActive(team[0]._id)
    },  [dispatch, team])

    const handleActiveChange = (number) => {
        setActive(number)
    }

    return ( 
        <section id="team" className="set-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-12 team-section-text">
                        <div className="section-text">
                            <h2 className="section-title underlined-heading">Our Awesome Team</h2>
                            <p>
                                At Syncadvert, the team headed by Mr Pradhyumna, our director, aims at providing our
                                customers the best of services ranging from weddings,
                                engagements, photoshoots and much more! From capturing the daunting beauty of a shy
                                bride that resonates with the charismatic charm of a new
                                groom to an action packed hustling of a mind boggling cinematic experience, we . . .
                                <br />
                                <Link className="mt-3" to="/about">Know More 
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </Link>
                            </p>
                        </div>
                        
                    </div>

                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 team-list">
                                <ul>
                                    {team && team.map(teamMember =>
                                        <li key={teamMember._id} className={active===teamMember._id ? "active" : ""} onClick={() => handleActiveChange(teamMember._id)}>
                                            <figure>
                                                <img src={s3BucketName + teamMember.img} alt={teamMember.name} />
                                            </figure>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="col-lg-9 col-md-8 team-single-container">
                                {team && team.map(teamMember => 
                                    <div key={teamMember._id} className={active===teamMember._id ? "team-single active" : "team-single" }>
                                        <div className="team-img">
                                           <img src={s3BucketName + teamMember.img} alt={teamMember.name} />
                                           <div className="team-social">
                                                <ul>
                                                    {Object.keys(teamMember.socialLinks).map(key =>
                                                        Object.keys(teamMember.socialLinks[key]).map(link => {
                                                            if (link !== '_id')
                                                                return <li key={teamMember.socialLinks[key]._id}>
                                                                    <a href={teamMember.socialLinks[key][link]}>
                                                                        <i className={"fa fa-"+link}></i>
                                                                    </a>
                                                                </li>
                                                            else 
                                                                return null
                                                        })
                                                    )}
                                                    {/* <li><a href={teamMember.socialLinks.facebook}><i className="fa fa-facebook"></i></a></li>
                                                    <li><a href={teamMember.socialLinks.twitter}><i className="fa fa-twitter"></i></a></li>
                                                    <li><a href={teamMember.socialLinks.instagram}><i className="fa fa-instagram"></i></a></li> */}
                                               </ul>
                                           </div>
                                       </div>
                                       <div className="team-info text-center mt-2">
                                            <h4>{teamMember.name}</h4>
                                            <p>{teamMember.role}</p>
                                       </div>
                                   </div> 
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default MainTeam;