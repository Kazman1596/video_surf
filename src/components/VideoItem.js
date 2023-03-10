import './VideoItem.css'
import React from 'react'


const VideoItem = ({ video, onVideoSelect }) => {
    return (
        <div onClick={()=> onVideoSelect(video)} className='video-item item'>
            <img alt={video.snippet.title} src={video.snippet.thumbnails.medium.url} />
            <div className='content'>
                <div className='title'>
                    {video.snippet.title}
                </div>
            </div>
        </div>
    )
}

export default VideoItem

// Most of the styling is done through SemanticUI, however centering text and such is within the custom css folder
// Also why we added the video-item class onto the root div... that's ours!