import React from 'react';
import './Rank.css'

const Rank = ({ name, entries }) =>{
    return(
        <div className='rank-container'>
            <div>
                {`Hello, ${name}! Your current entry count is:`}
            </div>
            <div className='mt2'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;
