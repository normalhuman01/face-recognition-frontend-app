import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) =>{
    return(
        <div className='container'>
            <div className='title'>
                {'This magic brain can detect faces in a picture.'}
            </div>
            <div className="center-flex">
                <input className='url' type='text' onChange={onInputChange}/>
                <button className='start' onClick={onButtonSubmit}> Start </button>
            </div>
        </div>
    )
}

export default ImageLinkForm;
