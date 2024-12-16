import React, { useState } from "react";
import { Grid } from "@mui/material"; // Updated import for Material-UI v5

import youtube from "./api/youtube";
import { SearchBars, VideoDetails, VideoList } from './components';

const App = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const onVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    const handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 10,
                key: 'AIzaSyBU2apoUoua55poiuoqP9x6DfhUgKSl7pU', 
                q: searchTerm,
            }
        });
        setVideos(response.data.items);
        setSelectedVideo(response.data.items[0]);
    };

    return (
        <Grid justifyContent="center" container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <SearchBars onFormSubmit={handleSubmit} />
                    </Grid>
                    <Grid item xs={8}>
                        <VideoDetails video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={onVideoSelect} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default App;
