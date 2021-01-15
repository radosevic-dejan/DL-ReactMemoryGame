import React from 'react';

const ImageContainer = ({ cardPath, cardAlt, cardClass }) => {
    
    return(
        <img
            src={ cardPath }
            alt={ cardAlt }
            className={ cardClass }

        />
    )
}

export default ImageContainer;