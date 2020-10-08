import React from 'react';

import './style.css'
import {s3BucketName} from './../../../config.json'

const UnderWork = () => {
    return ( 
        <div className="under-work mt-5">
            <img src={s3BucketName + 'construction-work.webp'} alt="under work" />
            <h1 className="text-center">UNDER WORK.</h1>
            <h4 className="text-muted text-center">Come back in a snap and we'll be ready with it.</h4>
        </div>
    );
}
 
export default UnderWork;