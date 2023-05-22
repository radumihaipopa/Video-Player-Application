# Video Player Application

The Video Player project is a web-based video player built with React, Shaka Player, and HLS.js. It enables streaming video playback with adaptive bitrate streaming and provides basic playback controls such as seeking, skip forward, skip backwards, play and pause. The player supports both Shaka Player and HLS.js for playback functionality, depending on the browser's compatibility. The application was created with `create-react-app`.

## Table of Contents
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
- [Components](#components)
    - [ShakaPlayer](#shakaplayer)
    - [HlsPlayer](#hlsplayer)
    - [SkipButtons](#skipbuttons)
    - [ProgressBar](#progressbar)
- [Customization](#customization)
- [Contributing](#contributing)
- [Resources](#resources)

## Getting Started

The Video Player project allows you to stream videos with adaptive bitrate streaming and control the playback using the provided controls. Follow the instructions below to get started with the project.

### Installation

To install and run the Video Player project locally, follow these steps:

1. Clone the project repository:

   ```git clone https://github.com/example/video-player.git```
   
2. Navigate to the project directory:

   ```cd video-player```

3. Install the project dependencies:

    ```npm install```

4. Start the development server:

    ```npm start```

5. Open your web browser and access the player at http://localhost:3000.

### Usage
Once the Video Player is running in your browser, you can use it to play a video stream by setting a new manifest URL in HLS.js and control the playback using the provided controls:

The video stream will automatically load and start playing.
The skip buttons allow you to jump forward or backward by 10 seconds.
The progress bar allows you to scrub back and forth through the video. Clicking on the video will pause / play the stream.

## Components
The Video Player project consists of the following components:

### ShakaPlayer
The ShakaPlayer component is responsible for managing video playback using Shaka Player. It provides adaptive bitrate streaming for optimized video playback. This component is used when the browser does not support HLS Player.

### HlsPlayer
The HlsPlayer component is responsible for managing video playback using HLS.js. It provides adaptive bitrate streaming for optimized video playback. It provides HLS video playback for browsers that support HLS Player.

### SkipButtons
The SkipButtons component renders the skip forward and backward buttons and handles the corresponding skip actions. It communicates with the active player component (ShakaPlayer or HlsPlayer) to update the video playback time when the user clicks on the skip buttons.

### ProgressBar
The ProgressBar component renders and handles user interactions with the progress bar. It communicates with the active player component (ShakaPlayer or HlsPlayer) to update the video playback position when the user scrubs through the progress bar.

## Customization
The Video Player project can be customized to fit your specific requirements and design preferences. You can modify the CSS styles, layout, and behavior of the components to match your desired look and feel.

To customize the project:

1. Open the project in your preferred code editor.
2. Locate the CSS file(s) responsible for styling the components.
3. Modify the CSS rules and properties to achieve the desired customization.
4. Save the changes and restart the development server if necessary.
5. Feel free to experiment and make changes to suit your needs. Remember to refer to the project's documentation for information about the component structure and props that can be customized.

## Contributing
Contributions to the Video Player project are welcome! If you find any issues, have suggestions for improvements, or would like to contribute new features, please feel free to submit a pull request.

Before contributing, please review the project's code of conduct and guidelines for contributors.

## Resources

- [React](https://reactjs.org/)
- [Shaka Player](https://github.com/google/shaka-player)
- [HLS.js](https://github.com/video-dev/hls.js)