import React from 'react';

const ControlPanel = ({ playerMoves, points, handleReset, endGame, message }) => {

    if(endGame === false){
       return (<div className="control">
            <h2>Moves { playerMoves }</h2>
            <button
                className="resetBtn"
                type="button"
                onClick={ handleReset }
            >
                Reset
            </button>
            <h2>Points { points }</h2>
        </div>)
    }

    return(
        <div className="endGame">
            <h1>You { message }</h1>
            <button
                className="resetBtn"
                type="button"
                onClick={ handleReset}
            >
                Start
            </button>
        </div>
    )
    
}

export default ControlPanel;