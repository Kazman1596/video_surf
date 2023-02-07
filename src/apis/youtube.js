import axios from 'axios'

const KEY = 'AIzaSyAVO8d9hRaY6ZAJosEr7ZlKPC_AIoXQGJ0'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
    }
})


// REACT APP --> Axios -(reaches out to googleapis.com/youtube)->
// Youtube is given an object (params) --> Returns a list of videos

// The params are used based off the documentation to use youtubeAPI