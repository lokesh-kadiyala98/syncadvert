import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTeamMembers, getTeam, deleteMember } from './../../../store/team';
import { s3BucketName } from './../../../config.json'
import AddForm from './addForm';
import EditForm from './editForm';
import Modal from './../../Modal';
import './style.css'

const Team = () => {
    const dispatch = useDispatch()

    const [addMember, addMemberToogler] = useState(false)
    const [editMember, editMemberToogler] = useState(null)
    const team = useSelector(getTeam)

    useEffect(() => {
        dispatch(fetchTeamMembers())
    }, [dispatch])

    const trashMember = ({_id, name}) => {
        if (window.confirm('Would you really want to DELETE ' + name + ' from the Team')) {
            dispatch(deleteMember(_id))   
        }
    }

    return ( 
        <React.Fragment>
            <h1 className="text-center underlined-heading">Team Members</h1>

            <section className="team">

                <div className="row">
                    <div className="col-12 mb-3 mt-3 add-member">
                        <button onClick={() => addMemberToogler(true)} className="btn-dbl btn btn-lg">
                            Add Member
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div className="team-members row">
                    {team.list && team.list.map(e =>
                        <div key={e._id} className="team-member col-8 col-sm-5 col-lg-4 col-xl-3">
                            <div className="image">
                                <img 
                                    src={s3BucketName + e.img} 
                                    alt={e.name} 
                                />
                                <div className="image-overlay">
                                    <i onClick={() => editMemberToogler(e)} className="fa fa-edit"></i>
                                    <i onClick={() => trashMember(e)} className="fa fa-trash"></i>
                                </div>
                            </div>
                            <div className="description">
                                <div className="name">{e.name}</div>
                                <div className="title">{e.role}</div>
                                <div className="social-icons">
                                    <a href={e.instagram}>
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                    <a href={e.twitter}>
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                    <a href={e.facebook}>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <Modal modal={addMember} 
                    overlayClassName="Overlay" 
                    onCancel={() => addMemberToogler(false)}
                >
                    <AddForm onCancel={() => addMemberToogler(false)} />
                </Modal>

                <Modal modal={editMember ? true : false} 
                    overlayClassName="Overlay" 
                    onCancel={() => editMemberToogler(null)}
                >
                    {editMember && <EditForm e={editMember} onCancel={() => editMemberToogler(null)} />}
                </Modal>

                
            </section>
        </React.Fragment>
    );
}
 
export default Team;