import React from "react";
import './App.css'
import SearchBar from "./SearchBar";
import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";
import youtube from '../apis/youtube'

class App extends React.Component {
    state = { videos: [], selectedVideo: null }

    componentDidMount() {
        this.onTermSubmit('life is beautiful festival')
    }

    onTermSubmit = async term => {
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        })

        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }

    render() {
        return(
            <div>
                <div className="header-menu">
                    <h1>Video Surf</h1>
                    <SearchBar onTermSubmit={this.onTermSubmit} />
                </div>
                <div className="container">
                    <div className="grid-container">
                        <div className="selected-video">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="video-list">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App

// Class-component because it holds all the different state for our
//  application (including videos, etc.)