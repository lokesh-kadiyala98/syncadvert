import React from 'react';
import ReactModal from 'react-modal';

import './style.css'

const Modal = (props) => {
    return ( 
        <ReactModal 
            isOpen={props.modal}
            className={"Modal "+ props.modalClassName}
            overlayClassName={props.overlayClassName}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
        >   
            <div style={{overflowY: 'hidden', height: '100vh'}}>
                <div style={{overflowY: 'auto', overflowX: 'hidden', height: '100%'}}>
                    {props.children}
                </div>
            </div>
        </ReactModal>
    );
}
 
export default Modal;