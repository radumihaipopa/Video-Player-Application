import React from 'react';

const SkipButtons = ({ videoRef, onSkipBack }) => {
    const handleSkip = (time, direction) => {
        if (videoRef.current) {
            videoRef.current.currentTime += time;
            if (direction === 'back') {
                onSkipBack();
            }
        }
    };

    return (
        <div className="skip-buttons">
            <button className="skip-button" onClick={() => handleSkip(-10, 'back')}>
                <i className="fas fa-backward"></i>
            </button>
            <button className="skip-button" onClick={() => handleSkip(10, 'forward')}>
                <i className="fas fa-forward"></i>
            </button>
        </div>

    );
};

export default SkipButtons;