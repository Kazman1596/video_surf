import React from "react";
import './VideoDetail.css'

const VideoDetail = ({ video }) => {
    if (!video) {
        return 'Loading...'
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`

    return (
        <div>
            <div className="video">
                <iframe title='video player' src={videoSrc} />
            </div>
            <div className="description">
                <h4 className="ui header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>
    )
}

export default VideoDetail