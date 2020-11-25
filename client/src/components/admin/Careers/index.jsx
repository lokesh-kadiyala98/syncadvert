import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from './../../Modal';
import Form from './form'
import './style.css'
import { fetchCareers, getCareers } from './../../../store/careers';
import ItemList from './itemList';

const AdminCareers = () => {
    const [form, formToogler] = useState(false)
    const dispatch = useDispatch()

    const {list, loading} = useSelector(getCareers)

    useEffect(() => {
        dispatch(fetchCareers())
    }, [dispatch])
    
    return ( 
        <React.Fragment>
            <h1 className="text-center underlined-heading">Careers</h1>
            
            <section className="mt-5">

                <div className="row">
                    <div className="col-12 mb-5 add-member">
                        <button onClick={() => formToogler(true)} className="btn-dbl btn btn-lg">
                            New Role
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>

                <ItemList 
                    list={list} 
                    loading={loading} 
                />
                
                <Modal modal={form} 
                    overlayClassName="Overlay" 
                    onCancel={() => formToogler(false)}
                >
                    <Form onCancel={() => formToogler(false)} />
                </Modal>
            </section>
        </React.Fragment>
    );
}
 
export default AdminCareers;