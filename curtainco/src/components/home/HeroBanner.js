import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner() {
    return (
        <div>
            <Link to={`/collections`}>
                <img
                    src="https://source.unsplash.com/random/600x300"
                    alt="Hero Banner Image"
                />
            </Link>
        </div>
    );
}

export default HeroBanner;
