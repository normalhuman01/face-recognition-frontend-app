import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) =>{
    return(
        <div className='center-flex'>
            <div className='image-container'>
                <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
                {drawBoxes(box)}
            </div>
        </div>
    )
}

const drawBoxes = (box) =>{
    let boxes = [];
    for(let i = 0; i < box.length; i++){
        boxes.push(
            <div
                key = {i} 
                className='bounding-box'
                style={
                    {
                        top: box[i].topRow, 
                        right: box[i].rightCol, 
                        bottom: box[i].bottomRow, 
                        left: box[i].leftCol
                    }
                }
            >
            </div>
        )
    }
    return <div>{boxes}</div>
}


export default FaceRecognition;
