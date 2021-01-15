import React from 'react';
import ImageContainer from './ImageContainer'

const CardContainer = ({ 
    faceCard, faceCardClass,
    backCard, backCardClass,
    dataName,
}) => {

    return(
        <div 
            className="card-holder"
            data-name={ dataName }
            
        >
            <ImageContainer 
                cardPath={ faceCard }
                cardAlt="Image"
                cardClass={ faceCardClass }
            />
            <ImageContainer 
                cardPath={ backCard }
                cardAlt="Image"
                cardClass={ backCardClass }
            />
        </div>
    )
}

export default CardContainer;