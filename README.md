# Connecting SearchBar to YouTubeAPI

**1**

- Starting with the class App, creat an onTermSubmit call and connect it to the <SearchBar /> component so the term essentially gets sent to <App/>

- In the SearchBar component, onFormSubmit does two things
    a) e.preventDefault
        -Stops refresh on submit
    b) this.props.onTermSubmit(this.state.term)
        -Sends the term, once submitted, to the <App />

<TESTING: You can test this by console.log(term) in the App's onTermSubmit to make sure you see it in the console>

**2**

- Import youtube.js from '../apis/youtube'

- youtube.get('/search', {
    *from here, manipulate the params.q as the term recieved from the search*
})
    -.get is an axios function, if you are confused
    -('/search') is an input path through the YouTube API documentation

<TESTING: You can test this by going to the Network tab, filtering by XHR/Fetch requests, and seeing if it makes a request to the API onFormSubmit. You can click on the request and see the entire object from the API, to eventually show what you want on the page, but we will get to that>

**3**

- Since making a request to an API is asyncronous, we must use async/await

- We can fetch the data of the request by assigning it to a variable (response, in this application)

-If you console.log this response, it is a ton of different variables and data. We only need response.data (as seen in the console.log(response))
*this is how we are getting our response.data.items.videos*

<TESTING: We tested this by creating text below the search bar that calls to this.state.videos.length, so we get the response "I have 5 videos" onFormSubmit>

# Creating VideoList and VideoItem

**1**

- Create boilerplate for new VideoList component

- Import VideoList into App.js and add the component below <SearchBar />

- Insert a CALLBACK to the state to recieve a list of videos
    - this.state.videos

TIP:

By Default-

const VideoList = props => {
    return <div>{props.videos.length}</div>
}
*Now, every time we get a list of videos, props.videos will be the result*

We can shorten our syntax, so we don't have to call props every time...

const VideoList = ({ videos }) => {
    return <div>{videos.length}</div>
}
*Now, we only have to call videos, instead of props.videos*

<TESTING: Using the same test as above, returning {videos.length} will show us this is still connected>

**2**

- Create a boilerplate for new VideoItem component

- Import VideoItem into VideoList

- Create a variable for renderedList, and videos.map(video =>...) returns a <VideoItem /> for each video.

- You will then want to return <div>{renderedList}</div> so it shows up on the screen

<TESTING: Render a simple boilerplate of VideoItem for each video, to make sure the response data is showing up onto the application.>

**3**

-Within the .map function on VideoList, make sure to insert a callback to video within the <VideoItem /> (<VideoItem video={video}>)

*props in VideoItem is now video*

-Remember to destructure the props
    a- instead of:
        const VideoItem = props =>
    b- use:
        const VideoItem = ({ video }) =>

-You will have to look at the video object to understand how to pull the title, or any other information out (how we get video.snippet.title or video.snippet.thumbnails.medium.url)

# Deeply Nested Callbacks from Child to Parent (telling App which VideoItem was clicked)

**1**

- Inside of your App component, we designed a new callback method, onVideoSelect()

- We also added a new variable in our state component, selectedVideo: null

<EXAMPLE> App.js

    onVideoSelect = (video) => {
        console.log('From the App!', video)
    }

**2**

- We pass this callback method down into VideoList

<EXAMPLE> App.js
    <VideoList 
        onVideoSelect={this.onVideoSelect} 
        videos={this.state.videos}
    />

**3**

- We then pass this callback method down into VideoItem

<EXAMPLE> VideoList.js
    const VideoList = ({ videos, onVideoSelect }) => {
        const renderedList = videos.map((video) => {
            return <VideoItem onVideoSelect={onVideoSelect} video={video} />
        })

    ...

**4**

- We then invoke this callback method in VideoItem, with the video, back up to the App component

<EXAMPLE> VideoItem.js
    const VideoItem = ({ video, onVideoSelect }) => {
        return (
            <div onClick={()=> onVideoSelect(video)} className='video-item item'>
    ...

*Up until now, we have been using information from parent to child using props, and is pretty straightforward... now, we are using information from child to parent, which is why we must implement the callback function method in order to achieve this*

<TESTING: In the parent, App component, console.log('From the app!', video), to make sure the correct information is being passed from the child, VideoItem component.>

*I don't know if it is necessary, but I will write a diagram in my notes to show the correlation of data being passed up the chain*

# Using information from selectedVideo, for our VideoDetail component

- Now that testing is done, change:
    
    onVideoSelect = (video) => {
        console.log('From the App!', video)
    }

    to...

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }

- state: { selectedVideo } is now the video from the child component, VideoItem

- You can now use this as a prop in VideoDetail to retrieve the information you would like (see <VideoDetail>)


    