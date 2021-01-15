import React from 'react';
import CardContainer from './CardContainer'

const GameContainer = ({ imgNum, cardFlip }) => {

    return(
        <div 
            className="game-container"  
            onClick={ e => cardFlip(e) }
                   
        >
            {
                imgNum.map( (card, i) => {
                    return(
                        <CardContainer 
                            key={i}
                            faceCard={ `/memory-cards/img${ card }.jpeg` }
                            backCard={ `/memory-cards/img0.jpeg` }
                            faceCardClass="face-card"
                            backCardClass="back-card"
                            dataName={`img${ card }`}
                        
                        />
                    )
                })
            }
        </div>
    )
}

export default GameContainer;