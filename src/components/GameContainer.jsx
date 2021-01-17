import React from 'react';
import CardContainer from './CardContainer'

const displayNone = {
    display: 'none'
}

const GameContainer = ({ imgNum, cardFlip, endGame }) => {

    return(
        <div 
            className="game-container"  
            onClick={ e => cardFlip(e) }
            style={ endGame === true ? displayNone : {display: 'flex'}}          
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