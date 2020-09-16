import React from 'react'

const Feedback = ({ message, level }) => {
     
    return (
        <div className={`mensaje error alert ${level}`}>
            {message}
        </div>
    )
}

export default Feedback