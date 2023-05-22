import React, { useRef, useEffect, useCallback, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.compiled.js';
import ProgressBar from './ProgressBar';
import SkipButtons from './SkipButtons';

const ShakaPlayer = () => {
	const videoRef = useRef(null);
	const playerRef = useRef(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [initialBandwidth, setInitialBandwidth] = useState(500000); // Initial low-resolution bandwidth

	const onError = useCallback((error) => {
		console.error('Error code', error.code, 'object', error);
	}, []);

	const onErrorEvent = useCallback(
		(event) => {
			onError(event.detail);
		},
		[onError]
	);

	useEffect(() => {
		const initializePlayer = async () => {
			shaka.polyfill.installAll();
			if (!shaka.Player.isBrowserSupported()) {
				console.error('Browser does not support Shaka Player');
				return;
			}
			const player = new shaka.Player(videoRef.current);
			playerRef.current = player;

			// Attach error event listener
			player.addEventListener('error', onErrorEvent);

			// Configure adaptive streaming
			player.configure({
				abr: {
					defaultBandwidthEstimate: initialBandwidth, // 500 Kbps
				},
			});

			// First choice was to use Shaka Player due to its great adaptive streaming algorithms and performance optimizations
			// Due to a networking issue while downloading the manifest file I left the implementation aside
			// Player works ok with MPD files

			// MPD file below
			const manifestUrl = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
			try {
				await player.load(manifestUrl);
				console.log('The video has now been loaded!');
				setIsLoading(false);
				setIsPlaying(true); // Autoplay the video
				videoRef.current.play();
			} catch (error) {
				onError(error);
			}
		};

		initializePlayer();

		return () => {
			if (playerRef.current) {
				// Clean up the player and event listeners
				playerRef.current.removeEventListener('error', onErrorEvent);
				playerRef.current.destroy();
			}
		};
	}, [initialBandwidth, onErrorEvent, onError]);

	const handleVideoPlay = useCallback(() => {
		setIsPlaying(true);
		videoRef.current.play();
	}, []);

	const handleVideoPause = useCallback(() => {
		setIsPlaying(false);
		videoRef.current.pause();
	}, []);

	const handleSkipBack = useCallback(() => {
		const currentBandwidth = playerRef.current.getStats().estimatedBandwidth;

		if (currentBandwidth > initialBandwidth) {
			setInitialBandwidth(currentBandwidth);
			const manifestURL = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

			playerRef.current
				.unload()
				.then(() => playerRef.current.load(manifestURL))
				.then(() => {
					console.log('Switched to higher-resolution video');
					videoRef.current.play();
				})
				.catch((error) => {
					console.error('Error loading higher-resolution video:', error);
				});
		}
	}, [initialBandwidth]);

	return (
		<div className="video-container">
			<video
				className="shaka-video"
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
						<SkipButtons videoRef={videoRef} onSkipBack={handleSkipBack}/>
					</>
				)}
			</div>
		</div>
	);
};

export default ShakaPlayer;