import React from 'react';

const ControlPanel = ({ playerMoves, points, handleReset }) => {
    return(
        <div className="control">
            <h2>{ playerMoves }</h2>
            <button
                className="resetBtn"
                type="button"
                onClick={ handleReset }
            >
                Reset
            </button>
            <h2>{ points }</h2>
        </div>
    )
}

export default ControlPanel;