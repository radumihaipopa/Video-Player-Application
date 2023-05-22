import React, { useRef, useEffect, useState } from 'react';

const ProgressBar = ({ videoRef }) => {
    const innerProgressRef = useRef(null);
    const scrubberRef = useRef(null);
    const progressContainerRef = useRef(null);
    const [isScrubbing, setIsScrubbing] = useState(false);

    const handleProgressBarClick = (event) => {
        const progress = event.currentTarget;
        const progressWidth = progress.offsetWidth;
        const clickPosition = event.clientX - progress.getBoundingClientRect().left;
        const clickPercentage = (clickPosition / progressWidth) * 100;
        const seekTime = (clickPercentage * videoRef.current.duration) / 100;

        videoRef.current.currentTime = seekTime;
    };

    const handleScrubberMouseDown = () => {
        setIsScrubbing(true);
    };

    const handleScrubberMouseUp = () => {
        setIsScrubbing(false);
    };



    const handleScrubberMouseMove = (event) => {
        if (isScrubbing) {
            const progress = innerProgressRef.current.parentNode;
            const progressWidth = progress.offsetWidth;
            const clickPosition = event.clientX - progress.getBoundingClientRect().left;
            const clickPercentage = (clickPosition / progressWidth) * 100;
            const seekTime = (clickPercentage * videoRef.current.duration) / 100;

            videoRef.current.currentTime = seekTime;
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        let animationFrameId = null;

        const updateProgressBar = () => {
            const innerProgress = innerProgressRef.current;
            const scrubber = scrubberRef.current;
            const currentTime = video.currentTime;
            const duration = video.duration;
            const progressPercentage = (currentTime / duration) * 100;

            innerProgress.style.width = `${progressPercentage}%`;
            scrubber.style.left = `${progressPercentage}%`;

            animationFrameId = requestAnimationFrame(updateProgressBar);
        };

        video.addEventListener('timeupdate', updateProgressBar);

        return () => {
            video.removeEventListener('timeupdate', updateProgressBar);
            cancelAnimationFrame(animationFrameId);
        };
    }, [videoRef]);

    useEffect(() => {
        const handleMouseLeave = () => {
            if (isScrubbing) {
                setIsScrubbing(false);
            }
        };
        const progressContainer = progressContainerRef.current;
        progressContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            progressContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isScrubbing]);


    return (
        <div className="progress-bar" onClick={handleProgressBarClick}>
            <div className="progress" ref={progressContainerRef}>
                <div className="inner-progress" ref={innerProgressRef}></div>
                <div
                    className="scrubber"
                    ref={scrubberRef}
                    onMouseDown={handleScrubberMouseDown}
                    onMouseUp={handleScrubberMouseUp}
                    onMouseMove={handleScrubberMouseMove}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;