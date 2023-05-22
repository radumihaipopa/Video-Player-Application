import React, { useRef, useEffect, useCallback, useState } from 'react';
import Hls from 'hls.js';
import ProgressBar from './ProgressBar';
import SkipButtons from './SkipButtons';

const HlsPlayer = () => {
	const videoRef = useRef(null);
	const playerRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const onError = useCallback((error) => {
		console.error('Error code', error.code, 'object', error);
	}, []);

	const onErrorEvent = useCallback((event) => {
		onError(event.detail);
	}, [onError]);

	const onLevelSwitching = useCallback((event, data) => {
		console.log('HLS level switched:', data.level);
		const hls = playerRef.current;
		if (hls && data && data.details && data.details.live === false) {
			const newLevel = data.level;
			const levels = hls.levels || [];
			const currentLevel = levels.findIndex((level) => level.url === hls.url);
			if (currentLevel !== -1 && newLevel > currentLevel) {
				hls.nextLevel = newLevel;
			}
		}
	}, []);

	useEffect(() => {
		const initializePlayer = async () => {
			const video = videoRef.current;
			const hls = new Hls();
			playerRef.current = hls;

			// Attach error event listener
			hls.on(Hls.Events.ERROR, (event, data) => {
				onError(data);
			});

			// Attach adaptive bitstream changes
			hls.on(Hls.Events.LEVEL_SWITCHING, onLevelSwitching);

			const manifestUrl =
				'https://d3ukqbhrqb4xnt.cloudfront.net/share_videos/6e95f9a732a74664a4982adf4b808500/e8ffab99-e494-495d-8b21-787e95f9672d/211115200114.m3u8';

			try {
				hls.loadSource(manifestUrl);
				hls.attachMedia(video);

				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					console.log('HLS manifest parsed');
					setIsLoading(false);
					setIsPlaying(true);
					video.play(); // Autoplay the video
				});
			} catch (error) {
				onError(error);
			}
		};

		initializePlayer();

		return () => {
			const hls = playerRef.current;
			if (hls) {
				hls.destroy();
			}
		};
	}, [onError, onErrorEvent, onLevelSwitching]);

	const handleVideoPlay = useCallback(() => {
		setIsPlaying(true);
		videoRef.current.play();
	}, []);

	const handleVideoPause = useCallback(() => {
		setIsPlaying(false);
		videoRef.current.pause();
	}, []);

	return (
		<div className="video-container">
			<video
				className="hls-video"
				ref={videoRef}
				onClick={isPlaying ? handleVideoPause : handleVideoPlay}
				muted={isPlaying}
			/>
			<div className="controls-container">
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						<ProgressBar videoRef={videoRef} />
						<SkipButtons videoRef={videoRef} />
					</>
				)}
			</div>
		</div>
	);
};

export default HlsPlayer;