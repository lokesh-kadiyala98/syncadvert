import React from 'react';

import './style.css'

const Quote = () => {
    return (
        <section className="quote set-padding">
            <div className="container">
                <h1 className="text-center text">
                    <span className="highlight">CREATIVITY</span>, <span className="highlight">PATEIENCE</span> and <span className="highlight">ATTENTION</span> to 
                    detail are the essential skills that a successful photographer should have in their repertoire apart from the technical knowledge about photography.
                </h1>
                <cite>
                    ~ Dr. Siddharth Thota<br />
                    <span>(phi creations)</span>
                </cite>
            </div> 
        </section>
    );
}
 
export default Quote;